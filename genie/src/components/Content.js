import { Table, Button, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HeartOutlined,
  LinkOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { firebaseConfig } from "../lib/base.js";
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { arrayUnion, doc, getFirestore, updateDoc } from "@firebase/firestore";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

const { Search } = Input;

const Content = () => {
  const [dataReady, setDataReady] = useState();
  const [res, setRes] = useState();
  const [idDoc, setIdDoc] = useState();

  useEffect(() => {
    console.log("re-display");
  }, [dataReady]);

  const columns = [
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Artiste",
      dataIndex: "artist",
      key: "artist",
      render: (obj) => (
        <>
          <a
            href={"http://www.songsterr.com/a/wa/artist?id=" + obj.id}
            target="_blank"
          >
            {obj.name}
          </a>
          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => handleAddFavoriteArtist(obj)}
          >
            <HeartOutlined />
          </Button>
        </>
      ),
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
      title: "Ajouter aux favoris",
      dataIndex: "",
      key: "",
      render: (obj) => (
        <Button onClick={() => handleAddFavoriteSong(obj)}>
          <PlusOutlined />
        </Button>
      ),
    },
  ];

  const handleAddFavoriteArtist = (obj) => {
    const newFavoriteArtist = {
      id: obj.id,
      name: obj.name,
    };
    const userDoc = doc(db, "users", "hrQvawIWDJJK6Q3VMGe0");
    updateDoc(userDoc, {
      favoriteArtist: arrayUnion(newFavoriteArtist),
    });
    message.success(obj.name + " ajouté aux favoris", 3);
  };
  const handleAddFavoriteSong = (obj) => {
    const newFavoriteSong = {
      id: obj.id,
      artist: obj.artist.name,
      title: obj.title,
    };
    const userDoc = doc(db, "users", "hrQvawIWDJJK6Q3VMGe0");
    updateDoc(userDoc, {
      favoriteSongs: arrayUnion(newFavoriteSong),
    });
    message.success(obj.title + " ajouté aux favoris", 3);
  };

  const handleSearch = (props) => {
    setDataReady(<Spin />);
    console.log(props);
    fetch("http://www.songsterr.com/a/ra/songs.json?pattern=" + props).then(
      (response) => {
        response
          .clone()
          .json()
          .then((dat) => {
            console.log(dat);
            setRes(dat);
          });
      }
    );
    setDataReady(<SearchOutlined />);
  };

  const result = () => {
    if (res) {
      if (res.length > 1) {
        return <div style={{ padding: "15px 5px" }}>{res.length} résultats</div>;
      } else {
        return <div style={{ padding: "15px 5px" }}>{res.length} résultat</div>;
      }
    } else {
      return <div style={{ padding: "15px 5px" }}>Pas de résultat</div>;
    }
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row",alignItems:"flex-end" }}>
        <div>
          <h1>Rechercher</h1>
          <Search
            placeholder="Artiste, Musique, ..."
            onSearch={handleSearch}
            style={{ width: 300, padding: "0 0 10px" }}
            enterButton={dataReady}
          />
        </div>
        {result()}
      </div>
      <Table columns={columns} dataSource={res} />
    </>
  );
};

export default Content;
