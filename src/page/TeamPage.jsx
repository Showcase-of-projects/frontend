import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeamData } from "../redux/slices/team";
import Modal from "../components/ModalTeam";

export default function TeamPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [topicId, setTopicId] = useState('');
  
  const { 
    user: currentUser, 
    isAuthenticated, 
    loading: authLoading 
  } = useSelector(state => state.auth);
  
  const userTeam = useSelector(state => state.team?.userTeam);
  const teamLoading = useSelector(state => state.team?.loading);
  const teamError = useSelector(state => state.team?.error);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleCreateTeam = () => {
    if (!teamName.trim() || !topicId || !currentUser) return;
    
    const teamData = {
      name: teamName,
      topicId: Number(topicId),
      lead: {
        id: currentUser.id,
        name: currentUser.name,
        surname: currentUser.surname,
        patronymic: currentUser.patronymic || '',
        group: currentUser.group || '',
        role: 'leader' 
      },
      userDTOS: [{
        id: currentUser.id,
        name: currentUser.name,
        surname: currentUser.surname,
        patronymic: currentUser.patronymic || '',
        group: currentUser.group || '',
        role: 'member'
      }],
      active: true
    };

    dispatch(addTeamData(teamData))
      .unwrap()
      .then(() => {
        setShowModal(false);
        setTeamName('');
        setTopicId('');
      })
      .catch(error => {
        console.error('Ошибка при создании команды:', error);
      });
  };
  if (authLoading || teamLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (teamError) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Произошла ошибка: {teamError.message || 'Неизвестная ошибка'}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {!userTeam ? (
        <div className="text-center">
          <h3>У вас еще нет команды</h3>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => setShowModal(true)}
            disabled={!isAuthenticated}
          >
            Создать команду
          </button>
          {!isAuthenticated && (
            <p className="text-muted mt-2">Для создания команды необходимо авторизоваться</p>
          )}
        </div>
      ) : (
        <div>
          <h2>Ваша команда: {userTeam.name}</h2>
          <div className="card mt-3">
            <div className="card-body">
              <h4 className="card-title">
                Лидер: {userTeam.lead.name} {userTeam.lead.surname}
              </h4>
              <h5 className="mt-3">Участники:</h5>
              <ul className="list-group">
                {userTeam.userDTOS?.map((member, index) => (
                  <li key={index} className="list-group-item">
                    {member.name} {member.surname} ({member.role})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4">
          <h3 className="mb-4">Создание новой команды</h3>
          
          <div className="mb-3">
            <label htmlFor="teamName" className="form-label">Название команды *</label>
            <input
              type="text"
              className="form-control"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              minLength={3}
            />
            <div className="form-text">Минимум 3 символа</div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="topicId" className="form-label">ID темы *</label>
            <input
              type="number"
              className="form-control"
              id="topicId"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              required
              min={1}
            />
            <div className="form-text">Числовой идентификатор темы</div>
          </div>
          
          {teamError && (
            <div className="alert alert-danger mb-3">
              {teamError.message || 'Ошибка при создании команды'}
            </div>
          )}
          
          <div className="d-flex justify-content-end">
            <button 
              className="btn btn-outline-secondary me-2" 
              onClick={() => setShowModal(false)}
            >
              Отмена
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleCreateTeam}
              disabled={!teamName.trim() || !topicId}
            >
              Создать команду
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}