import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CTabContent,
  CTabPane,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CBadge,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "../../axios";

function AllPosts({ history }) {
  const fields = ["title", "category", "action"];
  let publish = [];
  let draft = [];
  let thrash = [];

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const getArticle = await axios.get("/article/100/0").then((response) => {
        setPosts(response.data.items);
      });

      return getArticle;
    }
    fetchData();
  }, []);

  const handleSubmit = async (id) => {
    await axios
      .delete("/article/" + id)
      .then((response) => {
        setAlertMessage(response.data.message);
        setShowAlert(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  posts.forEach((post) => {
    switch (post.status) {
      case "publish":
        publish.push(post);
        break;
      case "draft":
        draft.push(post);
        break;
      default:
        thrash.push(post);
        break;
    }
  });

  return (
    <CCard>
      <CCardHeader>
        <h5>All Posts</h5>
      </CCardHeader>
      <CCardBody>
        {showAlert && (
          <CAlert color={"success"} dismissable={"true"}>
            {alertMessage}
          </CAlert>
        )}
        <CTabs>
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink>
                Publish
                <CBadge color={"primary"} className="ml-2">
                  {publish.length}
                </CBadge>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                Draft
                <CBadge color={"primary"} className="ml-2">
                  {draft.length}
                </CBadge>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink>
                Thrash
                <CBadge color={"primary"} className="ml-2">
                  {thrash.length}
                </CBadge>
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane>
              <CDataTable
                items={publish}
                fields={fields}
                itemsPerPage={5}
                pagination
                striped={true}
                hover={true}
                header={true}
                columnFilter={true}
                sorter={true}
                scopedSlots={{
                  action: (item) => (
                    <td>
                      <CButton
                        color={"warning"}
                        size={"sm"}
                        onClick={() => history.replace(`/post/${item.id}`)}
                      >
                        <CIcon name={"cil-pencil"}></CIcon>
                      </CButton>
                      <CButton
                        color={"danger"}
                        size={"sm"}
                        style={{ marginLeft: 2 }}
                        onClick={() => handleSubmit(item.id)}
                      >
                        <CIcon name={"cil-trash"}></CIcon>
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CTabPane>
            <CTabPane>
              <CDataTable
                items={draft}
                fields={fields}
                itemsPerPage={5}
                pagination
                striped={true}
                hover={true}
                header={true}
                columnFilter={true}
                sorter={true}
                scopedSlots={{
                  action: (item) => (
                    <td>
                      <CButton color={"warning"} size={"sm"}>
                        <CIcon name={"cil-pencil"}></CIcon>
                      </CButton>
                      <CButton
                        color={"danger"}
                        size={"sm"}
                        style={{ marginLeft: 2 }}
                        onClick={() => handleSubmit(item.id)}
                      >
                        <CIcon name={"cil-trash"}></CIcon>
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CTabPane>
            <CTabPane>
              <CDataTable
                items={thrash}
                fields={fields}
                itemsPerPage={5}
                pagination
                striped={true}
                hover={true}
                header={true}
                columnFilter={true}
                sorter={true}
                scopedSlots={{
                  action: (item) => (
                    <td>
                      <CButton
                        color={"warning"}
                        size={"sm"}
                        onClick={() => history.replace(`/post/${item.id}`)}
                      >
                        <CIcon name={"cil-pencil"}></CIcon>
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CTabPane>
          </CTabContent>
        </CTabs>
      </CCardBody>
    </CCard>
  );
}

export default AllPosts;
