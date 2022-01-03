import { Table, Tag, Space, Button, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  LinkOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {firebaseConfig} from "../lib/base";
import { initializeApp } from '@firebase/app';
import {getAuth} from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const { Search } = Input;


const Content = () => {
  const [dataReady, setDataReady] = useState();
  const [res, setRes] = useState();

  useEffect(() => {
    console.log("re-display");
  }, [dataReady]);

  const columns = [
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
      render: (text) => <a href="/">{text}</a>,
    },
    {
      title: "Artiste",
      dataIndex: "artist",
      key: "artist",
      render: (obj) => (
        <a
          href={"http://www.songsterr.com/a/wa/artist?id=" + obj.id}
          target="_blank"
        >
          {obj.name}
        </a>
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
  ];

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
        return (
          <div style={{ padding: "5px 5px" }}>{res.length} résultats</div>
        );
      } else {
        return (
          <div style={{ padding: "5px 5px" }}>{res.length} résultat</div>
        );
      }
    } else {
      return (
        <div style={{ padding: "5px 5px" }}>Pas de résultat</div>
      );
    }
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Search
          placeholder="Artiste, Musique, ..."
          onSearch={handleSearch}
          style={{ width: 300, padding: "0 0 10px" }}
          enterButton={dataReady}
        />
        {result()}
      </div>
      <Table columns={columns} dataSource={res} />
    </>
  );
};

export default Content;
