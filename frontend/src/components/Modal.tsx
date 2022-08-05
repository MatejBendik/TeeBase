import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  setOpen: boolean;
  handleCloseFunction: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subTitle: string;
  deleteUserFunction: () => any;
}

export default function TransitionsModal({
  setOpen,
  handleCloseFunction,
  title,
  subTitle,
  deleteUserFunction,
}: Props) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={setOpen}
      onClose={handleCloseFunction}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 800,
      }}
    >
      <Fade in={setOpen}>
        <Box sx={modal} className="modal">
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            sx={{
              textAlign: "center",
              padding: 2,
              backgroundColor: "#ebe8e8",
              borderRadius: 2,
            }}
          >
            {title}
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            {subTitle}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "red" }}
            onClick={deleteUserFunction}
          >
            Potvrdiť
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}

const modal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 55,
  p: 4,
  border: "none",
};
