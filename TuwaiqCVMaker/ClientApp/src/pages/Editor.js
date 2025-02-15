import React, { useState } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';
import authService from '../components/api-authorization/AuthorizeService';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Editor(props) {
    let create = true;
    let resume = null;

    if (props.location.state) {
        create = !props.location.state.edit;
        resume = props.location.state.resume;
    }

    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState(create ? "" : resume.title);
    const [template, setTemplate] = useState(create ? "Template1" : resume.template);
    const [name, setName] = useState(create ? "" : resume.name);
    const [email, setEmail] = useState(create ? "" : resume.email);
    const [phone, setPhone] = useState(create ? "" : resume.phone);
    const [jobDescription, setJobDescription] = useState(create ? "" : resume.jobDescription);
    const [skills, setSkills] = useState(create ? [] : resume.skills ? resume.skills : []);
    const [skill, setSkill] = useState("");
    const [level, setLevel] = useState(1);
    const [introduction, setIntroduction] = useState(create ? "" : resume.introduction);
    const [personalPicture, setPersonalPicture] = useState(create ? "" : resume.personalPicture);
    const [education, setEducation] = useState(create ? "" : resume.education);

    if (redirect) {
        return <Redirect to="/resumes" />;
    }

    const submitResume = async () => {
        const token = await authService.getAccessToken();
        const path = process.env.REACT_APP_API + "resumes";
        const config = { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } };
        const data = {
            title: title,
            template: template,
            name: name,
            email: email,
            phone: phone,
            introduction: introduction,
            skills: skills,
            education: education,
            personalPicture: personalPicture,
            jobDescription: jobDescription
        };

        if (create) {
            axios.post(path, data, config)
                .then(() => setRedirect(true))
                .catch(err => console.log(err));
        } else {
            axios.put(path + `/${resume.id}`, data, config)
                .then(() => setRedirect(true))
                .catch(err => console.log(err));
        }
    }

    const addSkill = () => {
        if (!skill.replace(/\s/g, '').length)
            return;

        setSkills([...skills, { name: skill, level: level }]);
    }

    const deleteSkill = (index) => {
        const temp = skills;
        temp.splice(index, 1);
        setSkills([...temp]);
    }

    return (
        <>
            <h1 className="text-center" >Resume Editor</h1>
            <Form className="mt-5" >
                <FormGroup>
                    <Label for="title">Resume Title</Label>
                    <Input type="text" name="title" id="title" placeholder="Backend developer resume" value={title} onChange={(event) => setTitle(event.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label for="template">Select Template</Label>
                    <Input type="select" name="template" id="template" value={template} onChange={(event) => setTemplate(event.target.value)}>
                        <option value="Template1">Template1</option>
                        <option value="Template2">Template2</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" placeholder="01000001 01101000 01101101 01100101 01100100" value={name} onChange={(event) => setName(event.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="tuwaiq_developer@tuwaiq.sa" value={email} onChange={(event) => setEmail(event.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" id="phone" placeholder="Backend developer resume" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label for="introduction">Introduction</Label>
                    <Input type="textarea" name="introduction" id="introduction" value={introduction} onChange={(event) => setIntroduction(event.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label for="jobDescription">Job Description</Label>
                    <Input type="text" name="jobDescription" id="jobDescription" placeholder="Backend developer resume" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label for="personalPicture">Personal Picture</Label>
                    <Input type="text" name="personalPicture" id="personalPicture" placeholder="Backend developer resume" value={personalPicture} onChange={(event) => setPersonalPicture(event.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label for="education">Education</Label>
                    <Input type="text" name="education" id="education" placeholder="Backend developer resume" value={education} onChange={(event) => setEducation(event.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Row>
                        <Col xs="8">
                            <Label for="skill">Skill</Label>
                        </Col>
                        <Col xs="4">
                            <Label for="skill">Level</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="8">
                            <Input type="text" name="skill" id="skill" placeholder="Backend developer resume" value={skill} onChange={(event) => setSkill(event.target.value)} />
                        </Col>
                        <Col xs="4">
                            <Input type="number" name="personalPicture" id="personalPicture" placeholder="Backend developer resume" value={level} onChange={(event) => {
                                const val = parseInt(event.target.value);

                                if(val < 1 || val > 4)
                                    return;

                                setLevel(val);
                            }} />
                        </Col>
                    </Row>
                </FormGroup>
                <Button onClick={addSkill}>AddSkill</Button>

                <div className="mt-3">
                    <Label>Your skills</Label>
                    <ListGroup>
                        {
                            skills.map((skill, index) => <ListGroupItem key={index} style={{ color: "black" }}>{skill.name}, Level: {skill.level} <Button onClick={() => deleteSkill(index)}>Delete</Button></ListGroupItem>)
                        }
                    </ListGroup>
                </div>

                <Button className="mt-5" onClick={submitResume}>Submit</Button>
            </Form>
        </>
    );
}

export default Editor;
