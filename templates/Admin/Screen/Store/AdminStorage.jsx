import { TreeItem, TreeView } from '@mui/x-tree-view';
import AppRemixIcons from '../../Layout/Component/Icon/AppRemixIcons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useCallback, useEffect, useState } from 'react';
import FolderAdd from '../../Layout/Component/Specific/Store/FolderAdd';
import ProjectDefaultRoute from '../../../../src/Routing/ProjectDefaultRoute';
import axios from 'axios';
import ArticleAdd from '../../Layout/Component/Specific/Store/ArticleAdd';
import ArticleEdit from '../../Layout/Component/Specific/Store/ArticleEdit';
import { useNavigate } from 'react-router';

export default function AdminStorage() {
  const [folders, setFolders] = useState();
  const navigate = useNavigate();

  const getFolders = useCallback(() => {
    axios
      .get(`${ProjectDefaultRoute}/api/storage/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .then((r) => setFolders(r.data))
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, []);

  useEffect(() => {
    getFolders();
  }, []);

  const deleteArticle = useCallback((articleID) => {
    axios
      .delete(`${ProjectDefaultRoute}/api/storage/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        data: { articleID },
      })
      .then(() => getFolders())
      .catch((errors) => {
        console.log(errors);
        if (errors.response?.status === 401) {
          localStorage.removeItem('authToken', null);
          navigate('/');
        }
      });
  }, []);

  return (
    <>
      <FolderAdd onSubmit={() => getFolders()} />

      {folders == null && (
        <div className="mt-5">No existen carpetas creadas</div>
      )}

      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{
          height: 'auto',
          flexGrow: 1,
          maxWidth: 'auto',
          overflowY: 'auto',
        }}
      >
        {folders?.map((folder) => (
          <TreeItem
            key={folder.id}
            nodeId={`folder-${folder.id}`}
            label={folder.name}
          >
            <div className="ms-3">
              <ArticleAdd folderID={folder.id} />
            </div>
            {folder.articles.map((article) => (
              <div className="mt-2 ms-3" key={article.id}>
                {article.name}
                <span className="d-inline-flex">
                  <ArticleEdit
                    onSubmit={() => getFolders()}
                    article={article}
                  />
                  <span onClick={() => deleteArticle(article.id)}>
                    <AppRemixIcons
                      icon="ri-delete-bin-2-line"
                      className="btn btn-outline-danger btn-sm"
                    />
                  </span>
                </span>
              </div>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </>
  );
}
