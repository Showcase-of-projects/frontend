import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ProjectCard = ({
  id,
  name,
  goal,
  departmentDTO,
  typeDTO,
  problemCarrier,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="mb-3 shadow-sm p-3"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 50,
      }}
    >
<div
  className="d-flex justify-content-between align-items-center"
  style={{ gap: "8px", flexWrap: "nowrap" }}
>
  <div
    className="flex-grow-1"
    style={{
      minWidth: 0, 
      overflowWrap: "break-word",
    }}
  >
    <Link
      to={`/topics/${id}`}
      className="text-dark text-decoration-none fw-bold"
      style={{ wordBreak: "break-word" }}
    >
      {name}
    </Link>
    <p className="text-muted mb-0" style={{ marginTop: "4px" }}>
      Цель проекта: {goal}
    </p>
  </div>

  <Button
    variant="link"
    onClick={() => setExpanded(!expanded)}
    className="text-dark p-0"
    style={{ flexShrink: 0, lineHeight: 1 }}
  >
    {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
  </Button>
</div>

      {expanded && (
        <div className="mt-3 text-muted">
          <p className="mb-1">
            <strong>Кафедра:</strong> {departmentDTO?.name}
          </p>
          <p className="mb-1">
            <strong>Тип проекта:</strong> {typeDTO?.name}
          </p>
          <p className="mb-0">
            <strong>Носитель проблемы:</strong> {problemCarrier}
          </p>
        </div>
      )}
    </Card>
  );
};

export default ProjectCard;
