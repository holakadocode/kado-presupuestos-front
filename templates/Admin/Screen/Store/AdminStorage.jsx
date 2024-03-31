//import { Field, Form, Formik } from "formik";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import AppRemixIcons from "../../Layout/Component/Icon/AppRemixIcons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useCallback, useEffect, useState } from "react";
//import { Box, Modal, Typography } from "@mui/material";
import FolderAdd from "../../Layout/Component/Specific/Store/FolderAdd";
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';
import axios from "axios";
import ArticleAdd from "../../Layout/Component/Specific/Store/ArticleAdd";
import ArticleEdit from "../../Layout/Component/Specific/Store/ArticleEdit";

export default function AdminStorage() {
  // const [folder, setFolder] = useState({
  //   Tornillos: ["Tornillo plano", "Tornillo estrella", "Tornillo Torx"],
  //   Tuercas: ["Tuerca redonda", "Tuerca cuadrada", "Tuerca ovalada"],
  // });

  const [folders, setFolders] = useState();

  const getFolders = useCallback(() => {
    axios
      .get(`${ProjectDefaultRoute}/api/storage/list`)
      .then((r) => setFolders(r.data))
      .catch((e) => console.log('E', e));
  }, []);

  const deleteArticle = useCallback((articleID) => {
    axios
      .delete(`${ProjectDefaultRoute}/api/storage/delete/${articleID}`)
      .then((r) => getFolders())
      .catch((e) => console.log('E', e));
  }, []);

  useEffect(() => {
    getFolders();
  }, []);


  return (
    <>
      <FolderAdd onSubmit={()=>getFolders()}/>

    {folders == null && <div>Aqui no hay nada</div> }

      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          height: "auto",
          flexGrow: 1,
          maxWidth: "auto",
          overflowY: "auto",
        }}
      >
        {folders?.map((folder) => (
          <TreeItem key={folder.id} nodeId={`folder-${folder.id}`} label={folder.name}>
            <div className="ms-5">
              <ArticleAdd folderID={folder.id} />
            </div>
            {folder.articles.map((article) => (
              <div className="ms-5 m-2 row" key={article.id}>
                <div className="col-2">{article.name}</div>
                <div className="col-1">
                  <div className="d-flex">
                    <ArticleEdit onSubmit={()=>getFolders()} article={article} />
                    <button onClick={()=>deleteArticle(article.id)}>
                    <AppRemixIcons
                      icon="ri-delete-bin-2-line"
                      className="me-2 btn btn-outline-danger btn-sm"
                    />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </>
  );
}
