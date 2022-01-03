import { Table, Tag, Space, Button, Input, Spin, Avatar } from "antd";
import { useEffect, useState } from "react";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  LinkOutlined,
  SearchOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { browserLocalPersistence } from "firebase/auth";
import {firebaseConfig} from "../lib/base";
import { initializeApp } from '@firebase/app';
import {getAuth} from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Account = () => {
  const columnsArtists = [
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

  const columnsSongs = [
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

  const artistsResult = [];
  const songsResult = [];

  const email = () => {
    if(auth.currentUser){
      return auth.currentUser.email;
    }
    else {
      return "Pas d'utilisateur connecté";
    }
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
          <strong>{email()}</strong>
        </h3>
      </div>
      <h3><StarFilled /> Mes artistes préférés</h3>
      <Table columns={columnsArtists} dataSource={artistsResult} />
      <h3><StarFilled /> Mes chansons préférées</h3>
      <Table columns={columnsSongs} dataSource={songsResult} />
    </div>
  );
};

export default Account;
