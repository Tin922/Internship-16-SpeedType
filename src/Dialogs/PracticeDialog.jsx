import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const PracticeDialog = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleConfirmPractice = (option) => {
    if (option === "yes") {
      onClose();

      navigate(`/practice`);
    } else onClose();
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Are you sure you want to practice?</DialogTitle>
      <DialogActions>
        <Button color="primary" onClick={() => handleConfirmPractice("yes")}>
          Yes
        </Button>
        <Button color="secondary" onClick={() => handleConfirmPractice("no")}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PracticeDialog;
