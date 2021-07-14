import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CPagination,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import axios from "../../axios";

function Preview() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let publish = [];

  useEffect(() => {
    function fetchData() {
      const getArticle = axios.get("/article/100/0").then((response) => {
        setPosts(response.data.items);
      });

      return getArticle;
    }
    fetchData();
  }, []);

  posts.forEach((post) => {
    post.status === "publish" && publish.push(post);
  });

  return (
    <CCard>
      <CCardHeader>Preview Blog</CCardHeader>
      <CCardBody>
        <h2 className="display-5 text-center">
          {publish[currentPage - 1]?.title}
        </h2>
        <hr />
        <CBadge color={"secondary"}>
          {publish[currentPage - 1]?.category}
        </CBadge>
        <p className="lead mt-4">{publish[currentPage - 1]?.content}</p>
      </CCardBody>
      <CCardFooter>
        <CPagination
          activePage={currentPage}
          pages={publish.length}
          onActivePageChange={setCurrentPage}
        />
      </CCardFooter>
    </CCard>
  );
}

export default Preview;
