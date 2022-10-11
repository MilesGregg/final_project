import React from "react";
import ReactDOM from "react-dom";
// import Modal from "react-modal"
import { styled, Avatar, Fab, AppBar, Typography, Toolbar, Grid, Box, Button, TextField, TableBody, TableRow, TableCell, TableContainer, Table, Paper, TableHead } from '@mui/material';
import Modal from '@mui/material/Modal';
import { pink } from "@mui/material/colors";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import BasicPost from "./post";
// import BlogDesc from "./description";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const centerStyle = {
    display: 'flex',
    alignItems: "center",
    direction: "row",
    flexDirection: 'column',
    background: "lightgrey"
  };


const blogs = []

export default function Reminders(description) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = React.useState({
        name: "",
        description: ""
    });
    

    const addBlog = () => {
        blogs.push(<BasicPost></BasicPost>)
        console.log(blogs)
    }

    return (
    <div style={centerStyle}>
        <div>
            <Box sx={{ height:"fit-content", width: 'fit-content', maxWidth: 500, borderRadius:3, borderWidth:1, border:5, borderColor:"navy" }}>
                <Typography variant="h3" gutterBottom>
                Blogger
                </Typography>
            </Box>
            <Fab style={{ backgroundColor:"green", color:"black", width:75, height:75}} onClick={handleOpen}>Make a post!</Fab>
            <Modal
                id="modalPost"
                open={open}
                onClose={handleClose}
                aria-labelledby="postMaker"
                aria-describedby="blogDescr"
            >
                <Box sx={style}>
                  <Box
                        component="form"
                     sx={{
                          '& > :not(style)': { m: 1, width: '45ch', height: '10ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography id="createBlog" variant="h6" component="h2">
                            Create your blog:
                        </Typography>
                        
                        {/* <BlogDesc></BlogDesc> */}
                        
                        <TextField onChange={e => {
                            setData({...data, description: e.target.value})
                            //console.log(data)
                        }} fullWidth inputProps={{ maxLength: 250 }} id="blogDescr" label="Start typing here..." multiline variant="filled"/>
                        <Button onClick={addBlog}>Post your blog!</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </div>



        <div id="insertBlogPosts">
            {<ul> {blogs.map(item => <ul>{item}</ul> )} </ul>}
        </div>
    </div>
    );
}



/*
class Reminders extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            add: {
                title: "",
                notes: "",
                url: "",
                date: "",
                time: "",
                location: ""
            },
            edit: {
                title: "",
                notes: "",
                url: "",
                date: "",
                time: "",
                location: "",
                _id: ""
            },
            table: [],
            open:false
            // setOpen:{open:true},
        }
    
    }

    async componentDidMount() {
        console.log('on page load')
        this.updateTable()
        console.log('updated table')
    }

    async updateTable() {
        const response = await fetch('/api/getdata', {
            method:'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await response.json();
        this.setState({ table: json });
    }

    onAddFormChange(type, e) {
        let copyadd = {}

        switch (type) {
            case "title":
                copyadd = { ...this.state.add, title: e.target.value };
                this.setState({add: copyadd})
                break;
            case "notes":
                copyadd = { ...this.state.add, notes: e.target.value };
                this.setState({add: copyadd})
                break;
            case "url":
                copyadd = { ...this.state.add, url: e.target.value };
                this.setState({add: copyadd})
                break;
            case "date":
                copyadd = { ...this.state.add, date: e.target.value };
                this.setState({add: copyadd})
                break;
            case "time":
                copyadd = { ...this.state.add, time: e.target.value };
                this.setState({add: copyadd})
                break;
            case "location":
                copyadd = { ...this.state.add, location: e.target.value };
                this.setState({add: copyadd})
                break;
        }

        console.log('in add change')
        console.log(this.state.add)
    }

    onEditFormChange(type, e) {
        let copyedit = {}

        switch (type) {
            case "title":
                copyedit = { ...this.state.edit, title: e.target.value };
                this.setState({edit: copyedit})
                break;
            case "notes":
                copyedit = { ...this.state.edit, notes: e.target.value };
                this.setState({edit: copyedit})
                break;
            case "url":
                copyedit = { ...this.state.edit, url: e.target.value };
                this.setState({edit: copyedit})
                break;
            case "date":
                copyedit = { ...this.state.edit, date: e.target.value };
                this.setState({edit: copyedit})
                break;
            case "time":
                copyedit = { ...this.state.edit, time: e.target.value };
                this.setState({edit: copyedit})
                break;
            case "location":
                copyedit = { ...this.state.edit, location: e.target.value };
                this.setState({edit: copyedit})
                break;
        }

        console.log('in edit change')
        console.log(this.state.edit)
    }

    async submitButton(type, e) {
        if (type === "add") {
            console.log('SUBMITTING NEW DATA')

            fetch('/api/newreminder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.add)
            }).then((response) => {
                if (response.status === 200) {
                    console.log('put data into table sucessfully')
                    let adds = {
                        title: "",
                        notes: "",
                        url: "",
                        date: "",
                        time: "",
                        location: ""
                    }
                    this.setState({add: adds})
                    this.updateTable()
                }
            })
        } else if (type === "edit") {
            console.log('SUBMITTING EDIT DATA')
            fetch('/api/updatereminder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.edit)
            }).then((response) => {
                if (response.status === 200) {
                    console.log('succesfully posted update')
                    let edits = {
                        title: "",
                        notes: "",
                        url: "",
                        date: "",
                        time: "",
                        location: "",
                        _id: ""
                    }
                    this.setState({edit: edits})
                    this.updateTable()
                }
            })
        }
    }

    async deleteButton(id, e) {
        console.log('DELETEING REMINDER')
        fetch('/api/deletereminder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: id })
        }).then((response) => {
            console.log('HERE')
            if (response.status === 200) {
                console.log('succesfully posted delete')
                this.updateTable()
            }
        })
    }

    editButton(title, notes, url, date, time, location, id, e) {
        console.log('LOADING INTO EDITING REMINDER')
        let edits = { title: title, notes: notes, url: url, date: date, time: time, location: location, _id: id };
        console.log(edits)
        this.setState({edit: edits})
    }

    render() {
        return (
            <>
                <Box style={{ paddingBottom: 50 }}>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" component="div" text-align="center">
                                Blogger
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                >
                
        
                    <div>
                        <Button onClick={this.handleOpen()}>Open modal</Button>
                        <Modal
                            open={this.state.open}
                            onClose={this.handleClose()}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                POST from User
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                               haha
                            </Typography>
                            </Box>
                        </Modal>
                    </div>
                
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography variant="h6" color="inherit" component="div">
                            Add a new reminder
                        </Typography>
                        <TextField onChange={(e) => this.onAddFormChange("title", e)} value={this.state.add.title} label={"Title"} style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onAddFormChange("notes", e)} value={this.state.add.notes} label={"Notes"} style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onAddFormChange("url", e)} value={this.state.add.url} label={"URL"} style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onAddFormChange("date", e)} value={this.state.add.date} label={"Date"} InputLabelProps={{ shrink: true }} type="date" style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onAddFormChange("time", e)} value={this.state.add.time} label={"Time"} InputLabelProps={{ shrink: true }} type="time" style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onAddFormChange("location", e)} value={this.state.add.location} label={"Location"} style={{paddingBottom: 10}}/>
                        <Button variant="contained" onClick={(e) => this.submitButton("add", e)}>Submit</Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Typography variant="h6" color="inherit" component="div">
                            Edit a reminder
                        </Typography>
                        <TextField onChange={(e) => this.onEditFormChange("title", e)} value={this.state.edit.title} label={"Title"} style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onEditFormChange("notes", e)} value={this.state.edit.notes} label={"Notes"} style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onEditFormChange("url", e)} value={this.state.edit.url} label={"URL"} style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onEditFormChange("date", e)} value={this.state.edit.date} label={"Date"} InputLabelProps={{ shrink: true }} type="date" style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onEditFormChange("time", e)} value={this.state.edit.time} label={"Time"} InputLabelProps={{ shrink: true }} type="time" style={{paddingBottom: 10}}/>
                        <TextField onChange={(e) => this.onEditFormChange("location", e)} value={this.state.edit.location} label={"Location"} style={{paddingBottom: 10}}/>
                        <Button variant="contained" onClick={(e) => this.submitButton("edit", e)}>Submit</Button>
                    </Box>
                    <Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Delete</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Notes</TableCell>
                                        <TableCell>URL</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Location</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.table.map((row, index) => {
                                        return (
                                            <TableRow key={row.name}>
                                                <TableCell>
                                                    <Button variant="contained" onClick={(e) => this.deleteButton(row._id, e)}>Delete</Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained" onClick={(e) => this.editButton(row.title, row.notes, row.url, row.date, row.time, row.location, row._id, e)}>Edit</Button>
                                                </TableCell>
                                                <TableCell>{row.title}</TableCell>
                                                <TableCell>{row.notes}</TableCell>
                                                <TableCell>{row.url}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.time}</TableCell>
                                                <TableCell>{row.location}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </>
        );
    }
}

export default Reminders;*/