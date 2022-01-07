import { Table, Tag, Space, Button, Input, Spin, Avatar } from "antd";
import { useEffect, useState } from "react";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
  LinkOutlined,
  SearchOutlined,
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
          <DeleteOutlined style={{color:"red"}}/>
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
      render: (obj) => <a>{obj.artist}</a>,
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
          <DeleteOutlined style={{color:"red"}}/>
        </Button>
      ),
    },
  ];

  const [artistsResult, setArtistsResult] = useState();
  const [songsResult, setSongsResults] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      const docRef = doc(db, "users", "hrQvawIWDJJK6Q3VMGe0");
      const docSnap = getDoc(docRef).then((doc) => {
        console.log(doc.data());
        setSongsResults(doc.data().favoriteSongs);
        setArtistsResult(doc.data().favoriteArtist);
      });
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    const docRef = doc(db, "users", "hrQvawIWDJJK6Q3VMGe0");
    const docSnap = getDoc(docRef).then((doc) => {
      console.log(doc.data());
      setSongsResults(doc.data().favoriteSongs);
      setArtistsResult(doc.data().favoriteArtist);
    });
  }, []);

  const handleDelFavoriteSong = (obj) => {
    const delFavoriteSong = {
      id: obj.id,
      artist: obj.artist,
      title: obj.title,
    };
    console.log("data artist", delFavoriteSong);
    const userDoc = doc(db, "users", "hrQvawIWDJJK6Q3VMGe0");
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
    const userDoc = doc(db, "users", "hrQvawIWDJJK6Q3VMGe0");
    updateDoc(userDoc, {
      favoriteArtist: arrayRemove(delFavoriteArtist),
    });
    setRefresh(true);
  }

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
          <strong>Prénom Nom</strong>
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
