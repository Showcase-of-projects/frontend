import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTopicById } from "../redux/slices/topics";
import Header from "../components/Header";


const TopicPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedTopic } = useSelector((state) => state.topics);

  useEffect(() => {
    if (id) {
      dispatch(fetchTopicById(id));
    }
  }, [dispatch, id]);

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
          <h2 className="mb-4 text-dark fw-semibold">
            {selectedTopic?.name}
          </h2>
          <div className="d-flex flex-column gap-3 text-start">
            {topicInfo.map((item, index) => (
              <div key={index} className="row">
                <div className="col-md-4" style={{ color: "#A1824A" }}>
                  {item.label}:
                </div>
                <div
                  className="col-md-8"
                  style={{ color: "#A1824A" }}
                >
                  {item.value || "Не указано"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
