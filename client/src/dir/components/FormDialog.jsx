import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';
import { useMutation } from 'react-query';
import { complaintPostRequest } from '../../hooks';


export default function FormDialog(props) {

  const handleDialogClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
        return;
    }
    props.handleClose();
  }

  const complaintMutation = useMutation(complaintPostRequest, {
    onSuccess: data => {
        console.log(data)
        if(!data.ok) {
            alert(data.error)
        }
    },
    onError: () => alert("Network error. try again"),
    onSettled: () => {
        props.handleClose()
        props.refetch()
    }
  })
  
  function handleSubmit(event) {
    event.preventDefault()
    const formData = {
        userId: props.userId,
        title: event.target[0].value,
        messageContent: event.target[1].value,
    }

    complaintMutation.mutate({ postDetails: formData, route: "create" })
    console.log(formData);
  }

  

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: event => handleSubmit(event),
        }}
      >
      {complaintMutation.isLoading ? <DialogContent sx={{background: "rgba(0, 0, 0, 0.87)"}}>
        <CircularProgress size={100}/>
      </DialogContent> :
      <>
        <DialogTitle>Submit a complaint</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            sx={{width: "400px"}}
            label="brief header"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            autoFocus
            required
            margin="dense"
            id="name"
            name="messageContent"
            sx={{width: "400px"}}
            label="describe your complaint"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </>}
      </Dialog>
    </React.Fragment>
  );
}
