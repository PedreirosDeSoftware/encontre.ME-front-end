import { useEffect, useState, useRef } from "react";
import "./css/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";
import { UploadedURI } from "../../utils/URI";
import Post from "../../components/Post";

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

  const contentNameRef = useRef(null); // Ref to the content_name div

  const handleEditMode = () => {
    setEditName(true);
  };

  const handleReturn = () => navigate('/');

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('name', currentName);
    if (selectedImage) {
      formData.append('avatar', selectedImage);
    }

    try {
      const authResponse = await axios.get("http://localhost:3333/api/account/authorization", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!authResponse) {
        throw new Error("Unauthorized");
      }

      await axios.put(
        `http://localhost:3333/api/account/${authResponse.data.authToken.id}/edit`,
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
      return selectedImage;
    }
    return 'defaultUser.png';
  };

  useEffect(() => {
    if (!token) {
      handleLogout();
      return;
    }

    const fetchAccount = async () => {
      try {
        const authResponse = await axios.get("http://localhost:3333/api/account/authorization", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (authResponse.data.authToken) {
          const accountResponse = await axios.get(`http://localhost:3333/api/account/${authResponse.data.authToken.id}`, {
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

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const postList = response.data.posts || [];
        const postPromises = postList.map(async (post) => {
          const accountCreator = await axios.get(`http://localhost:3333/api/account/${post.account_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const creator = accountCreator.data.account;
          return {
            id: post.id,
            avatarImage:`http://localhost:3333/uploads/${creator.avatarImage}` ,
            accountname: creator.name,
            location: `${creator.state} - ${creator.city}`,
            image: `http://localhost:3333/uploads/${post.photo}`,
            description: post.description
          };
        });

        const newPostList = await Promise.all(postPromises);
        setPosts(newPostList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
    fetchPosts();
  }, [navigate, token]);

  const handleUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      setSelectedImage(image);
      console.log("Imagem carregada:", image.name);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentNameRef.current && !contentNameRef.current.contains(event.target)) {
        setEditName(false); // Set EditName to false when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contentNameRef]);

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
            <div className="content__bull">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="content__actions">
            <a onClick={handlePublish} className={`${EditName ? 'enabled' : ''}`}>
              Salvar
            </a>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path
                  fill="currentColor"
                  d="M208 352c-41 0-79.1-9.3-111.3-25-21.8 12.7-52.1 25-88.7 25a7.83 7.83 0 0 1-7.3-4.8 8 8 0 0 1 1.5-8.7c.3-.3 22.4-24.3 35.8-54.5-23.9-26.1-38-57.7-38-92C0 103.6 93.1 32 208 32s208 71.6 208 160-93.1 160-208 160z"
                ></path>
                <path
                  fill="currentColor"
                  d="M576 320c0 34.3-14.1 66-38 92 13.4 30.3 35.5 54.2 35.8 54.5a8 8 0 0 1 1.5 8.7 7.88 7.88 0 0 1-7.3 4.8c-36.6 0-66.9-12.3-88.7-25-32.2 15.8-70.3 25-111.3 25-86.2 0-160.2-40.4-191.7-97.9A299.82 299.82 0 0 0 208 384c132.3 0 240-86.1 240-192a148.61 148.61 0 0 0-1.3-20.1C522.5 195.8 576 253.1 576 320z"
                ></path>
              </svg>
              <span>Message</span>
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
            post.accountname === currentAccount.name?
              (<Post
              key={post.id}
              creatorProfile={post.avatarImage}
              image={post.image}
              creatorName={post.accountname}
              location={post.location}
              description={post.description}
              />)
            : null
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
