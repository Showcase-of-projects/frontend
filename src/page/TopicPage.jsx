import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchTopicById } from "../redux/slices/topics";
import Header from "../components/Header";
import Team from "../assets/teams.png";

const TopicPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedTopic } = useSelector((state) => state.topics);

  useEffect(() => {
    if (id) {
      dispatch(fetchTopicById(id));
    }
  }, [dispatch, id]);

  const teams = [
    { id: "1", name: "УВП-311" },
    { id: "2", name: "УВП-312" },
    { id: "3", name: "УВП-211" },
  ];

  const topicInfo = [
    { label: "Цель проекта", value: selectedTopic?.goal },
    { label: "Носитель проблемы", value: selectedTopic?.problemCarrier },
    { label: "Существующие решения", value: selectedTopic?.existingSolutions },
    { label: "Ключевые слова", value: selectedTopic?.keywords },
    { label: "Тип проекта", value: selectedTopic?.typeDTO?.name },
    { label: "Кафедра", value: selectedTopic?.departmentDTO?.name },
  ];

  return (
    <div
      className="d-flex flex-column align-items-center min-vh-100 p-3"
      style={{
        backgroundColor: "#F7FAFC",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 50,
        marginTop: "3em",
      }}
    >
      <Header />
      <div className="container py-4 d-flex flex-column align-items-center">
        <div className="w-100" style={{ maxWidth: "800px" }}>
          <h2 className="mb-4 text-dark fw-semibold">{selectedTopic?.name}</h2>
          <div className="d-flex flex-column gap-3 text-start">
            {topicInfo.map((item, index) => (
              <div
                key={index}
                style={{
                  color: "#A1824A"
                }}
              >
                <span style={{fontSize: "1rem" }}>
                  {item.label}:
                </span>{" "}
                <span style={{ fontSize: "1rem" }}>
                  {item.value || "Не указано"}
                </span>
              </div>
            ))}

            <div className="mt-4">
              <h5 className="mb-2 text-dark fw-semibold">Teams:</h5>
              <div
                className="bg-white rounded-3 shadow-sm"
                style={{ padding: "12px 16px" }}
              >
                <div className="d-flex flex-column" style={{ gap: "8px" }}>
                  {teams.map((team) => (
                    <Link
                      key={team.id}
                      to={`/teams/${team.id}`}
                      className="d-flex align-items-center text-dark text-decoration-none p-2 rounded-3 transition-all"
                    >
                      <div
                        className="flex-shrink-0"
                        style={{
                          width: "28px",
                          height: "28px",
                          marginRight: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={Team}
                          alt="team"
                          className="w-100 h-100 object-fit-contain"
                        />
                      </div>
                      <span style={{ fontSize: "0.9rem" }}>{team.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
