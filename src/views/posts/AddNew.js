import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CRow,
  CCol,
  CLabel,
  CTextarea,
  CButton,
  CSelect,
  CAlert,
} from "@coreui/react";
import axios from "../../axios";

import React, { useState } from "react";

const AddNew = (props) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    category: "",
    status: "publish",
  });

  const [showAlert, setshowAlert] = useState(false);
  const [alertMessage, setalertMessage] = useState("");

  const handleSubmit = async (e) => {
    await axios
      .post("/article", {
        title: post.title,
        content: post.content,
        category: post.category,
        status: post.status,
      })
      .then((response) => {
        setalertMessage(response.data.message);
        setshowAlert(true);
        setPost({
          title: "",
          content: "",
          category: "",
          status: "publish",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CCard>
      <CCardHeader>New Post</CCardHeader>
      <CCardBody>
        {showAlert && (
          <CAlert color={"success"} dismissable={"true"}>
            {alertMessage}
          </CAlert>
        )}
        <CRow>
          <CCol sm={12} style={{ marginTop: 10 }}>
            <CLabel>Title</CLabel>
            <CInput
              label={"Title"}
              placeholder={"Input Title"}
              value={post.title}
              onChange={handleChange}
              name={"title"}
            />
          </CCol>
          <CCol sm={12} style={{ marginTop: 10 }}>
            <CLabel>Content</CLabel>
            <CTextarea
              label={"Content"}
              placeholder={"Input Content"}
              value={post.content}
              onChange={handleChange}
              name={"content"}
            />
          </CCol>
          <CCol sm={12} style={{ marginTop: 10 }}>
            <CLabel>Category</CLabel>
            <CInput
              label={"Category"}
              placeholder={"Input Category"}
              value={post.category}
              onChange={handleChange}
              name={"category"}
            />
          </CCol>
          <CCol sm={12} style={{ marginTop: 10 }}>
            <CLabel>Status</CLabel>
            <CSelect name={"status"} label={"status"} onChange={handleChange}>
              <option value={"publish"}>Publish</option>
              <option value={"draft"}>Draft</option>
            </CSelect>
          </CCol>
          <CCol sm={12} style={{ marginTop: 10 }}>
            <CButton onClick={handleSubmit} type={"submit"} color={"primary"}>
              Submit
            </CButton>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default AddNew;
