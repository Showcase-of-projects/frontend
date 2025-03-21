import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Header from "../components/Header";
import "../css/showcase.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const projects = [
  {
    title: "Навигатор ИУЦТ, ЦТУТП",
    goal: "Снизить время поиска маршрута до необходимой аудитории на 20%",
    department: " ЦТУТП",
    projectType: " Учебно-прикладной проект",
    problemHolder: " Заведующий хозяйством ИУЦТ ",
  },
  {
    title: "Энергоэффективное депо, ХиИЭ",
    goal: "Хочет повысить энергоэффективность зданий и сооружений депо на 20%",
    department: " ХиИЭ",
    projectType: " Прикладной проект",
    problemHolder: " Главный инженер депо",
  },
  {
    title: "В любую точку Москвы на одном самокате, ЛТСТ",
    goal: "Хочет увеличить сеть беспересадочных (длинных) маршрутов на самокатах в пределах Москвы (кол-во возможных маршрутов увеличить на 20 %)",
    department: " ЛТСТ",
    projectType: " Учебный проект",
    problemHolder:
      " Менеджер по работе с клиентами прокатной компании самокатов",
  },
  {
    title: "Вышивальщица, ЦТУТП",
    goal: "Хочет уменьшить количество бракованных изделий до 5%",
    department: " ЦТУТП",
    projectType: " Учебно-прикладной проект",
    problemHolder: " Главный технолог ООО Вышивальщица",
  },
  {
    title: "Навигатор ИУЦТ, ЦТУТП",
    goal: "Снизить время поиска маршрута до необходимой аудитории на 20%",
    department: " ЦТУТП",
    projectType: " Учебно-прикладной проект",
    problemHolder: " Заведующий хозяйством ИУЦТ ",
  },
  {
    title: "Энергоэффективное депо, ХиИЭ",
    goal: "Хочет повысить энергоэффективность зданий и сооружений депо на 20%",
    department: " ХиИЭ",
    projectType: " Прикладной проект",
    problemHolder: " Главный инженер депо",
  },
  {
    title: "В любую точку Москвы на одном самокате, ЛТСТ",
    goal: "Хочет увеличить сеть беспересадочных (длинных) маршрутов на самокатах в пределах Москвы (кол-во возможных маршрутов увеличить на 20 %)",
    department: " ЛТСТ",
    projectType: " Учебный проект",
    problemHolder:
      " Менеджер по работе с клиентами прокатной компании самокатов",
  },
  {
    title: "Вышивальщица, ЦТУТП",
    goal: "Хочет уменьшить количество бракованных изделий до 5%",
    department: " ЦТУТП",
    projectType: " Учебно-прикладной проект",
    problemHolder: " Главный технолог ООО Вышивальщица",
  },
];
const departments = [
  "ЦТУТП",
  "ХиИЭ",
  "ЛТСТ",
  "ЖДСТУ",
  "ЛиУТС",
  "УТБиИС",
  "УЭРиБТ",
];
const projectTypes = [
  "Учебный проект",
  "Прикладной проект",
  "Учебно-прикладной проект",
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState("");

  const filteredProjects = projects.filter((project) => {
    return (
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedDepartment ? project.department === selectedDepartment : true) &&
      (selectedProjectType ? project.projectType === selectedProjectType : true)
    );
  });

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedDepartment("");
    setSelectedProjectType("");
  };

  return (
    <div
      className="d-flex flex-column align-items-center min-vh-100 p-3"
      style={{
        backgroundColor: "#F7FAFC",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 50,
        marginTop: "60px",
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
                style={{ minWidth: "100px", backgroundColor: "#EDEDED" }}
              >
                Кафедра 
              </button>
              <ul className="dropdown-menu">
                {departments.map((dept) => (
                  <li key={dept}>
                    <button
                      className="dropdown-item"
                      style={{ fontSize: "14px" }}
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      {dept}
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
                style={{ minWidth: "100px", backgroundColor: "#EDEDED" }}
              >
                Тип проекта 
              </button>
              <ul className="dropdown-menu">
                {projectTypes.map((type) => (
                  <li key={type}>
                    <button
                      className="dropdown-item"
                      style={{ fontSize: "14px" }}
                      onClick={() => setSelectedProjectType(type)}
                    >
                      {type}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="projects-wrapper">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
