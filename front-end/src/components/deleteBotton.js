import React, { useEffect} from 'react';
import { useNavigate, useParams} from 'react-router-dom';

const DeleteButton = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  
      useEffect(() => {
          const user = localStorage.getItem('user');
          if (!user) {
              navigate('/login');
          }
      }, [navigate]);
  

 const handleDelete = async () => {
    await fetch(`http://localhost:8080/item/${id}`, {
      method: "DELETE",
    });
    alert("Item deleted");
    navigate('/profile'); // Redirect to home page
  };

  return <button onClick={handleDelete}>Delete Item</button>;
};

export default DeleteButton;
