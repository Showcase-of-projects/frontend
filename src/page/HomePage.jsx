import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import Header from "../components/Header";
import "../css/showcase.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopics } from "../redux/slices/topics";

const HomePage = () => {
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.topics);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedProjectType, setSelectedProjectType] = useState(null);

  const departments = [...new Map(
    topics
      .filter(topic => topic.departmentDTO)
      .map(topic => [topic.departmentDTO.id, topic.departmentDTO])
  ).values()];

  const projectTypes = [...new Map(
    topics
      .filter(topic => topic.typeDTO)
      .map(topic => [topic.typeDTO.id, topic.typeDTO])
  ).values()];

  
  useEffect(() => {
    dispatch(
      fetchTopics({
        name: searchQuery || null,
        departmentId: selectedDepartment?.id || null,
        typeId: selectedProjectType?.id || null,
      })
    );
  }, [dispatch, searchQuery, selectedDepartment, selectedProjectType]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedDepartment(null);
    setSelectedProjectType(null);
  };

  const handleDepartmentSelect = (dept) => {
    setSelectedDepartment(dept);
  };

  const handleProjectTypeSelect = (type) => {
    setSelectedProjectType(type);
  };

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
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div className="d-flex flex-column w-100">
          <div className="mb-2 w-100">
            <div className="position-relative w-100">
              <span className="position-absolute start-0 top-50 translate-middle-y ps-3">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-0 rounded-3 px-5 py-3 shadow-sm w-100"
                placeholder="Поиск проекта..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ backgroundColor: "#EDEDED" }}
              />
              {searchQuery && (
                <span
                  className="position-absolute top-50 translate-middle-y"
                  onClick={() => setSearchQuery("")}
                  style={{
                    right: "20px",
                    cursor: "pointer",
                  }}
                >
                  <i className="bi bi-x-circle text-muted"></i>
                </span>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-2 w-100">
            <div className="dropdown">
              <button
                className="btn btn-sm rounded-pill shadow-sm px-2 text-dark border-0"
                style={{ minWidth: "100px", backgroundColor: "#EDEDED" }}
                onClick={handleClearSearch}
              >
                Все проекты
              </button>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-sm rounded-pill shadow-sm px-2 text-dark border-0 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ minWidth: "100px", backgroundColor: "#EDEDED" }}
              >
                {selectedDepartment ? selectedDepartment.name : "Кафедра"}
              </button>
              <ul className="dropdown-menu">
                {departments.map((dept) => (
                  <li key={dept.id}>
                    <button
                      className={`dropdown-item ${
                        selectedDepartment?.id === dept.id ? "active" : ""
                      }`}
                      style={{ fontSize: "14px" }}
                      onClick={() => handleDepartmentSelect(dept)}
                    >
                      {dept.name}
                      {selectedDepartment?.id === dept.id && (
                        <span className="ms-2">
                          <i className="bi bi-check"></i>
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-sm rounded-pill shadow-sm px-2 text-dark border-0 dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ minWidth: "100px", backgroundColor: "#EDEDED" }}
              >
                {selectedProjectType ? selectedProjectType.name : "Тип проекта"}
              </button>
              <ul className="dropdown-menu">
                {projectTypes.map((type) => (
                  <li key={type.id}>
                    <button
                      className={`dropdown-item ${
                        selectedProjectType?.id === type.id ? "active" : ""
                      }`}
                      style={{ fontSize: "14px" }}
                      onClick={() => handleProjectTypeSelect(type)}
                    >
                      {type.name}
                      {selectedProjectType?.id === type.id && (
                        <span className="ms-2">
                          <i className="bi bi-check"></i>
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="projects-wrapper">
        {topics.map((topic) => (
          <ProjectCard
            key={topic.id}
            name={topic.name}
            goal={topic.goal}
            departmentDTO={topic.departmentDTO}
            typeDTO={topic.typeDTO}
            problemCarrier={topic.problemCarrier}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
