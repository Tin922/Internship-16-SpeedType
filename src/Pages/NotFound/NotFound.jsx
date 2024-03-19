import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.css";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.notFoundContainer}>
      <h1>404</h1>
      <Link
        component="button"
        variant="body2"
        onClick={() => {
          navigate("/");
        }}
      >
        Go to HomePage
      </Link>
    </div>
  );
};

export default NotFound;
