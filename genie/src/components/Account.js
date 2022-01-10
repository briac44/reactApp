import { Table, Button, Avatar } from "antd";
import { useEffect, useState } from "react";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
  LinkOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  arrayRemove,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "@firebase/firestore";

import { firebaseConfig } from "../lib/base";
import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore();

const Account = () => {
  const columnsArtists = [
    {
      title: "Artiste",
      dataIndex: "name",
      key: "name",
      render: (obj) => <p>{obj}</p>,
    },
    {
      title: "Lien",
      dataIndex: "id",
      key: "id",
      render: (obj) => (
        <a
          href={"http://www.songsterr.com/a/wa/song?id=" + obj}
          target="_blank"
        >
          <LinkOutlined />
        </a>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (obj) => (
        <Button danger onClick={() => handleDelFavoriteArtist(obj)}>
          <DeleteOutlined style={{ color: "red" }} />
        </Button>
      ),
    },
  ];

  const columnsSongs = [
    {
      title: "Titre",
      dataIndex: "",
      key: "",
      render: (text) => (
        <a
          href={"http://www.songsterr.com/a/wa/song?id=" + text.id}
          target="_blank"
        >
          {text.title}
        </a>
      ),
    },
    {
      title: "Artiste",
      dataIndex: "",
      key: "",
      render: (obj) => <p>{obj.artist}</p>,
    },
    {
      title: "Partition",
      dataIndex: "chordsPresent",
      key: "chordsPresent",
      render: (text) => {
        if (text) {
          return <CheckCircleTwoTone twoToneColor="#95CD41" />;
        } else {
          return <CloseCircleTwoTone twoToneColor="#F05454" />;
        }
      },
    },
    {
      title: "Lien",
      dataIndex: "id",
      key: "id",
      render: (obj) => (
        <a
          href={"http://www.songsterr.com/a/wa/song?id=" + obj}
          target="_blank"
        >
          <LinkOutlined />
        </a>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (obj) => (
        <Button danger onClick={() => handleDelFavoriteSong(obj)}>
          <DeleteOutlined style={{ color: "red" }} />
        </Button>
      ),
    },
  ];

  const [artistsResult, setArtistsResult] = useState();
  const [songsResult, setSongsResults] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = getDoc(docRef).then((doc) => {
        console.log(doc.data());
        setSongsResults(doc.data().favoriteSongs);
        setArtistsResult(doc.data().favoriteArtist);
      });
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    if (auth.currentUser) {
      console.log(auth.currentUser.uid);
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = getDoc(docRef).then((doc) => {
        console.log(doc.data());
        if (doc) {
          setSongsResults(doc.data().favoriteSongs);
          setArtistsResult(doc.data().favoriteArtist);
        }
      });
    }
  }, []);

  const handleDelFavoriteSong = (obj) => {
    const delFavoriteSong = {
      id: obj.id,
      artist: obj.artist,
      title: obj.title,
    };
    console.log("data artist", delFavoriteSong);
    const userDoc = doc(db, "users", auth.currentUser.uid);
    updateDoc(userDoc, {
      favoriteSongs: arrayRemove(delFavoriteSong),
    });
    setRefresh(true);
  };

  const handleDelFavoriteArtist = (obj) => {
    const delFavoriteArtist = {
      id: obj.id,
      name: obj.name,
    };
    console.log("data artist", delFavoriteArtist);
    const userDoc = doc(db, "users", auth.currentUser.uid);
    updateDoc(userDoc, {
      favoriteArtist: arrayRemove(delFavoriteArtist),
    });
    setRefresh(true);
  };

  const email = () => {
    if (auth.currentUser) {
      return auth.currentUser.email;
    } else {
      return "Pas d'utilisateur connecté";
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Avatar size={64} icon={<UserOutlined />} />
        <h3>
          <strong>{email()}</strong>
        </h3>
      </div>
      <h3>
        <StarFilled /> Mes chansons préférées
      </h3>
      <Table columns={columnsSongs} dataSource={songsResult} />
      <h3>
        <StarFilled /> Mes artistes préférés
      </h3>
      <Table columns={columnsArtists} dataSource={artistsResult} />
    </div>
  );
};

export default Account;
