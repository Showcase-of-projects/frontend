import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import file from "../assets/file.png";
import Header from "../components/Header";
import ModalTeam from "../components/ModalTeam";
import { fetchTopics, fetchTopicById } from "../redux/slices/topics";
import {
  addTeamData,
  fetchActiveTeam,
  setTeamTopic,
} from "../redux/slices/team";
import {
  selectTeam,
  selectTeamLoading,
  selectTopics,
  selectCurrentTopic,
} from "../redux/selectors/teamSelectors";
import { jwtDecode } from "jwt-decode";

const TeamPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const team = useSelector(selectTeam);
  const loading = useSelector(selectTeamLoading);
  const topics = useSelector(selectTopics);
  const currentTopic = useSelector(selectCurrentTopic);

  const [searchTopic, setSearchTopic] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [filteredTopics, setFilteredTopics] = React.useState([]);

  const files = [
    {
      name: "Product Roadmap (1).pdf",
      date: "2023-01-05",
      size: "12MB",
      image: file,
    },
    {
      name: "Product Roadmap (2).pdf",
      date: "2023-01-05",
      size: "33MB",
      image: file,
    },
    {
      name: "Product Roadmap (3).pdf",
      date: "2023-01-05",
      size: "28MB",
      image: file,
    },
    {
      name: "Product Roadmap (1).pdf",
      date: "2023-01-05",
      size: "12MB",
      image: file,
    },
  ];

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchActiveTeam());
      dispatch(fetchTopics({ name: "", departmentId: "", typeId: "" }));
    }
  }, [token, navigate, dispatch]);

  const handleCreateTeam = () => {
    if (!token) return;

    const decoded = jwtDecode(token);
    const leadUser = {
      id: decoded.id,
      name: decoded.name,
      surname: decoded.surname,
      patronymic: decoded.patronymic,
      group: decoded.group,
      role: decoded.role || "LEADER",
    };

    const teamData = {
      id: Date.now(),
      name: "Новая команда",
      lead: leadUser,
      topicId: 1,
      userDTOS: [leadUser],
      active: true,
    };

    dispatch(addTeamData(teamData));
  };

  React.useEffect(() => {
    if (team?.topicId) {
      dispatch(fetchTopicById(team.topicId));
    }
  }, [team?.topicId, dispatch]);

  React.useEffect(() => {
    if (searchTopic.trim()) {
      dispatch(fetchTopics({ name: searchTopic }))
        .unwrap()
        .then((data) => {
          const processedTopics = data.map((topic) => ({
            id: topic.id,
            name: topic.name,
          }));
          setFilteredTopics(processedTopics);
        })
        .catch((err) => console.error("Ошибка загрузки тем:", err));
    } else {
      setFilteredTopics([]);
    }
  }, [searchTopic, dispatch]);

  const handleSetTopic = async () => {
    try {
      const topic = filteredTopics.find((t) => t.name === selectedTopic);
      if (!topic) {
        alert("Тема не найдена");
        return;
      }

      console.log("Setting topic with ID:", topic.id);

      const resultAction = await dispatch(setTeamTopic(topic.id));

      if (setTeamTopic.fulfilled.match(resultAction)) {
        console.log("Topic set successfully:", resultAction.payload);
        setIsModalOpen(false);
        setSelectedTopic("");
        setSearchTopic("");
        dispatch(fetchActiveTeam());
        dispatch(fetchTopics({}));
      } else {
        throw resultAction.payload;
      }
    } catch (error) {
      console.error("Ошибка при установке темы:", error);
      alert(`Ошибка: ${error || "Не удалось установить тему"}`);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "90px",
          backgroundColor: "#F7FAFC",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          minHeight: "100vh",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!team ? (
          <div className="text-center py-5">
            <p className="fs-5 text-secondary mb-4">У вас еще нет команды :(</p>
            <button
               onClick={handleCreateTeam}
                className="btn"
                style={{
                  backgroundColor: "rgba(75, 85, 99, 0.1)",
                  color: "#4B5563",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "rgba(75, 85, 99, 0.2)")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "rgba(75, 85, 99, 0.1)")
              }
            >
              Создать команду
            </button>
          </div>
        ) : (
          <div
            style={{
              maxWidth: "1200px",
              width: "100%",
              display: "flex",
              gap: "2rem",
            }}
          >
            <div style={{ width: "60%" }}>
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: "600",
                  marginBottom: "2rem",
                }}
              >
                {team.name || "Ваша команда"}
              </h1>

              {team && !team.topicId && (
                <div style={{ marginBottom: "2rem" }}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      padding: "0.5rem 1rem",
                      backgroundColor: "rgba(217, 217, 217, 0.5)",
                      color: "#756E74",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    Выбрать тему проекта
                  </button>
                </div>
              )}

              {team?.topicId && (
                <div style={{ marginBottom: "2rem" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Работа над проектом
                  </h3>
                  <div
                    style={{
                      backgroundColor: "rgba(217, 217, 217, 0.5)",
                      color: "#4B5563",
                      borderRadius: "20px",
                      padding: "10px 15px",
                      display: "inline-block",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                  >
                    {currentTopic?.name}
                  </div>
                </div>
              )}

              <div className="mb-3">
                <div className="d-flex align-items-center mb-3">
                  <h3
                    className="me-3 mb-0"
                    style={{ fontWeight: 600, fontSize: "20px" }}
                  >
                    Команда
                  </h3>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "rgba(217, 217, 217, 0.5)",
                      color: "#756E74",
                      border: "none",
                    }}
                  >
                    Пригласить
                  </button>
                </div>

                <div className="d-flex flex-column gap-3">
                  {team.userDTOS.map((user) => (
                    <div
                      key={user.id}
                      className="d-flex align-items-center gap-3"
                    >
                      <div
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          backgroundColor: "#ddd",
                          backgroundImage: user.photo
                            ? `url(${user.photo})`
                            : "none",
                          backgroundSize: "cover",
                        }}
                      ></div>

                      <div>
                        <div className="fw-semibold">
                          {user.surname} {user.name}{" "}
                          {user.patronymic && user.patronymic}
                        </div>
                        <div className="text-muted">{user.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <h2 className="fs-5 fw-semibold mb-3">Загруженные файлы</h2>
              <div className="p-3 rounded">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className={`d-flex justify-content-between align-items-center py-2 ${
                      index !== files.length - 1 ? "border-bottom" : ""
                    }`}
                  >
                    <div className="d-flex align-items-center gap-3">
                      {file.image && (
                        <img
                          src={file.image}
                          alt={file.name}
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <strong>{file.name}</strong>
                    </div>
                    <div className="d-flex gap-3 text-muted">
                      <span>{file.date}</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <ModalTeam
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          searchTopic={searchTopic}
          setSearchTopic={setSearchTopic}
          filteredTopics={filteredTopics}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          onSetTopic={handleSetTopic}
          loading={loading}
        />
      </div>
    </>
  );
};

export default TeamPage;
