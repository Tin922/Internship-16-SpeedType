import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import { useGame } from "./GameProvider";
import { useUserStats } from "./UserStatsProvider";
import { useNavigate } from "react-router-dom";

const ResultsDialog = ({ isOpen, onClose, onSubmit }) => {
  const { totalGameWPM } = useGame();
  const { averageWPMForUser } = useUserStats();
  const navigate = useNavigate();
  const navgiateToHomePage = () => {
    navigate("/");
    onClose();
  };
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Results</DialogTitle>
      <DialogContent>
        <Box mb={2}>Average WPM for game: {totalGameWPM}</Box>
        <Box mb={2}>Total average WPM: {averageWPMForUser}</Box>
      </DialogContent>
      <DialogContent>Do you want to play again?</DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} color="primary">
          Yes
        </Button>
        <Button onClick={navgiateToHomePage} color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResultsDialog;
