import styled from 'styled-components';

export default function AppCard(props) {
  const { title, content, className } = props;

  return (
    <div className={`card ${className}`}>
      {title && (
        <>
          <div className="ms-3 mb-2 mt-2">{title}</div>
          <Separator />
        </>
      )}
      <div className="card-body">
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
}

const Separator = styled.div`
  height: 2px;
  width: 100%;
  background-color: #e6e4e4;
`;
