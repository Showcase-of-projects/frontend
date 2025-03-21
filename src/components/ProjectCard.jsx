import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ProjectCard = ({
  title,
  goal,
  department,
  projectType,
  problemHolder,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="mb-3 shadow-sm p-3"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 50 }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="flex-grow-1">
          <Link
            to={`/`}
            className="text-dark text-decoration-none fw-bold"
          >
            {title}
          </Link>
          <p className="text-muted mb-0">Цель проекта: {goal}</p>
        </div>
        <div
          className="d-flex justify-content-end"
          style={{ minWidth: "40px" }}
        >
          <Button
            variant="link"
            onClick={() => setExpanded(!expanded)}
            className="text-dark p-0"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </Button>
        </div>
      </div>
      {expanded && (
        <div className="mt-3 text-muted">
          <p>Кафедра: {department}</p>
          <p>Тип проекта: {projectType}</p>
          <p>Носитель проблемы: {problemHolder}</p>
        </div>
      )}
    </Card>
  );
};

export default ProjectCard;
