import React, { useState, useEffect } from "react";

const ModalTeam = ({
  isOpen,
  onClose,
  searchTopic,
  setSearchTopic,
  filteredTopics,
  selectedTopic,
  setSelectedTopic,
  onSetTopic,
  loading,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (searchTopic) {
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchTopic]);

  if (!isOpen) return null;

  const handleSelectTopic = (topicName) => {
    setSelectedTopic(topicName);
    setSearchTopic(topicName);
    setDropdownVisible(false);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-dialog"
        role="document"
        style={{
          maxWidth: "550px",
          height: "43vh",
          margin: "200px auto",
          display: "flex",
          flexDirection: "column",
          zIndex: 1050,
        }}
      >
        <div
          className="modal-content"
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "24px",
            backgroundColor: "#F9F9F9",
            border: "1px solid rgba(205, 205, 205, 0.5)",
          }}
        >
          <div
            className="modal-header border-0 pb-0 justify-content-center"
            style={{ textAlign: "center" }}
          >
            <h5 className="modal-title fw-bold" style={{ width: "100%", color: "#605C5C" }}>
              Выберите тему проекта
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                onClose();
                setSelectedTopic("");
                setSearchTopic("");
                setDropdownVisible(false);
              }}
              style={{
                position: "absolute",
                right: "16px",
                top: "16px",
              }}
            ></button>
          </div>

          <div
            className="modal-body pt-3 px-3"
            style={{
              overflowY: "auto",
              flexGrow: 1,
              minHeight: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ position: "relative" }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control rounded-end border-start-0"
                  placeholder="Поиск темы..."
                  value={searchTopic}
                  onChange={(e) => {
                    setSearchTopic(e.target.value);
                    setDropdownVisible(true);
                    setSelectedTopic("");
                  }}
                  autoFocus
                  style={{
                    zIndex: 10,
                    backgroundColor: "#DCDCDC",
                    borderColor: "#DCDCDC",
                    boxShadow: "none",
                    transition: "background-color 0.3s, border-color 0.3s",
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = "#BFBFBF";
                    e.target.style.borderColor = "#BFBFBF";
                    e.target.style.outline = "none";
                    e.target.style.boxShadow = "none";
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = "#DCDCDC";
                    e.target.style.borderColor = "#DCDCDC";
                  }}
                />
              </div>

              {dropdownVisible && (
                <ul
                  className="list-group"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    maxHeight: "180px",
                    overflowY: "auto",
                    marginTop: "4px",
                    border: "1px solid #ced4da",
                    borderRadius: "0.375rem",
                    backgroundColor: "#EDEDED",
                    boxShadow:
                      "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
                    zIndex: 1000,
                    scrollbarWidth: "none", 
                    msOverflowStyle: "none", 
                  }}
                  onWheel={(e) => e.stopPropagation()}
                >
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((topic) => (
                      <li
                        key={topic.id}
                        className="list-group-item list-group-item-action"
                        style={{
                          cursor: "pointer",
                          padding: "8px 16px",
                          userSelect: "none",
                          backgroundColor:
                            selectedTopic === topic.name ? "#E0E0E0" : "transparent",
                          color: "#333",
                          fontWeight: selectedTopic === topic.name ? "100" : "normal",
                        }}
                        onClick={() => handleSelectTopic(topic.name)}
                        tabIndex={0}
                        role="option"
                        aria-selected={selectedTopic === topic.name}
                      >
                        {topic.name}
                      </li>
                    ))
                  ) : (
                    <li
                      className="list-group-item text-muted text-center py-3"
                      style={{ cursor: "default" }}
                    >
                      Нет тем, соответствующих поиску
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>

          <div className="modal-footer border-0" style={{ gap: "10px" }}>
            <button
              type="button"
              className="btn"
              onClick={() => {
                onClose();
                setSelectedTopic("");
                setSearchTopic("");
                setDropdownVisible(false);
              }}
              style={{
                backgroundColor: "#F7FAFC",
                border: "1px solid #EFEFEF",
                color: "#BEBEBE",
                padding: "6px 20px",
                borderRadius: "6px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Отмена
            </button>
            <button
              type="button"
              className="btn"
              disabled={!selectedTopic || loading}
              onClick={onSetTopic}
              style={{
                backgroundColor: "#BEBEBE",
                border: "1px solid #EFEFEF",
                color: "white",
                padding: "6px 20px",
                borderRadius: "6px",
                fontWeight: "500",
                cursor: !selectedTopic || loading ? "not-allowed" : "pointer",
                opacity: !selectedTopic || loading ? 0.6 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Загрузка...
                </>
              ) : (
                "Установить тему"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTeam;
