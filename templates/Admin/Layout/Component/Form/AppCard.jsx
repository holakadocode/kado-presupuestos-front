import styled from 'styled-components';

export default function AppCard(props) {
  const { title, className, children } = props;

  return (
    <div className={`card ${className}`}>
      {title && (
        <>
          <div className="ms-3 mb-2 mt-2">{title}</div>
          <Separator />
        </>
      )}
      <div className="card-body">
        <span className="card-text">{children}</span>
      </div>
    </div>
  );
}

const Separator = styled.div`
  height: 2px;
  width: 100%;
  background-color: #e6e4e4;
`;
