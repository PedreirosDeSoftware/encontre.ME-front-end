import { useEffect, useState, useRef } from "react";
import "./css/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import { UploadedURI } from "../../utils/URI";
import Post from "../../components/Post";
import { Loading } from "../../components/Loading";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState({});
  const [currentName, setCurrentName] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { account: token, logout } = UseAuth();
  const handleLogout = () => logout();
  const [selectedImage, setSelectedImage] = useState(null);
  const [EditName, setEditName] = useState(false);

  const contentNameRef = useRef(null); // Ref para o div de nome do usuário

  const handleEditMode = () => {
    setEditName(true);
  };

  const handleReturn = () => navigate('/feed');

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('name', currentName);
    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    try {
      const authResponse = await axios.get("https://encontre-me-back-end.onrender.com/api/account/authorization", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!authResponse) {
        throw new Error("Unauthorized");
      }

      await axios.put(
        `https://encontre-me-back-end.onrender.com/api/account/${authResponse.data.authToken.id}/edit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const handleImage = () => {
    if (currentAccount.avatarImage) {
      return `${UploadedURI}${currentAccount.avatarImage}`;
    }
  if (selectedImage) {
      return URL.createObjectURL(selectedImage);
    }
    return 'User.png';
  };

  

  useEffect(() => {
    if (!token) {
      handleLogout();
      return;
    }

    const fetchAccount = async () => {
      try {
        const authResponse = await axios.get("https://encontre-me-back-end.onrender.com/api/account/authorization", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (authResponse.data.authToken) {
          const accountResponse = await axios.get(`https://encontre-me-back-end.onrender.com/api/account/${authResponse.data.authToken.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (accountResponse.data && accountResponse.data.account) {
            setCurrentAccount(accountResponse.data.account);
          } else {
            handleLogout();
          }
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPosts = async (userId) => {
      try {
        const response = await axios.get('https://encontre-me-back-end.onrender.com/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const postList = response.data.posts || [];
        const filtered = postList.filter(post => post.account_id === userId);

        const postPromises = filtered.map((post) => ({
          id: post.id,
          accountId: currentAccount.id,
          avatarImage: `${UploadedURI}${currentAccount.avatarImage}`,
          accountname: currentAccount.name,
          location: `${currentAccount.state} - ${currentAccount.city}`,
          image: `${UploadedURI}${post.photo}`,
          description: post.description,
        }));

        setPosts(postPromises);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (currentAccount.id) {
      fetchPosts(currentAccount.id);
    } else {
      fetchAccount();
    }
  }, [token, currentAccount.id]);

  const handleUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      setSelectedImage(image);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentNameRef.current && !contentNameRef.current.contains(event.target)) {
        setEditName(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contentNameRef]);

   // Display loading or error messages
   if (loading) return <Loading />;
   if (error) return navigate('/');
  return (
    <main className="cd__main">
      <button onClick={handleReturn} className={'logoutBtn'}>
        Voltar
        <img src="logout.png" alt="Logout" />
      </button>
      <div className="profile-page">
        <div className="content">
          <div className="content__cover">
            <div className="content__avatar">
              <img src={handleImage()} alt="" />
              <input 
                type='file' 
                name='Adicionar imagem' 
                onChange={handleUpload} 
                accept="image/*"
                onClick={handleEditMode}
              />
            </div>
          </div>
          <div className="content__actions">
            <a onClick={handlePublish} className={`${EditName ? 'enabled' : ''}`}>
              Salvar
            </a>
          </div>
          <div className="content__title">
            <div className="content_name" onClick={handleEditMode} ref={contentNameRef}>
              <h1>{currentAccount.name}</h1>
              {EditName && (
                <input 
                  type="text" 
                  value={currentName} 
                  onChange={(e) => setCurrentName(e.target.value)} 
                  className="enabled"
                />
              )}
            </div>
            <p>{`${currentAccount.state} - ${currentAccount.city}`}</p>
          </div>

          <ul className="content__list">
            <li>
              <span>{posts.length}</span>Posts
            </li>
          </ul>
        </div>
        <section>
        {posts.length === 0 ? (
          <h1>No posts found...</h1>
        ) : (
          posts.map((post) => (
              <Post
                key={post.id}
                creatorProfile={post.avatarImage}
                image={post.image}
                creatorName={post.accountname}
                location={post.location}
                description={post.description}
                editable={true}
              />
          ))
        )}
        </section>
        <div className="bg">
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
