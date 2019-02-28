import React, { Component } from 'react';
import ChatBot from '../../../react-simple-chatbot';

class GreetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allergies: [],
      favFood: '',
      opened: true,
    };

    this.toggleFloating = ({ opened }) => {
      this.setState({ opened });
    };
  }


  render() {
    const { allergies, favFood, opened } = this.state;
    const { user } = this.props;
    const voices = speechSynthesis.getVoices();
    const setVoice = () => speechSynthesis.voice = voices[4];
    if (window.previous === 'signup') {
      window.previous = '/';
      return (
        <ChatBot
          headerTitle="C.A.I.N."
          speechSynthesis={{ enable: true, lang: 'en', voice: voices[4] }}
          steps={[
            {
              id: '1',
              message: `Hello ${user}, I am 'CAIN', (Client. Appitite. Indulgence. Network).`,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Please tell me if you have any allergies!\nYou can list them below, separated by a comma',
              trigger: 'allergies',
            },
            {
              id: 'allergies',
              user: true,
              validator: (value) => {
                if (value) {
                  const allergy = value.split(',');
                  this.setState({ allergies: allergy });
                  return true;
                }
                return true;
              },
              trigger: '4',
            },
            {
              id: '4',
              message: 'Thank you! The following allergies: {previousValue} have been saved.',
              trigger: '5',
            },
            {
              id: '5',
              message: 'What is your favorite food?',
              trigger: 'favFood',
            },
            {
              id: 'favFood',
              user: true,
              validator: (value) => {
                if (value) {
                  this.setState({ favFood: value });
                  return true;
                }
                return true;
              },
              trigger: '6',
            },
            {
              id: '6',
              message: 'Fuck yeah, {previousValue}!!!',
              trigger: '7',
            },
            {
              id: '7',
              message: 'Would you like to update any of the previous fields?',
              trigger: 'update-question',
            },
            {
              id: 'update-question',
              options: [
                { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                { value: 'no', label: 'No', trigger: 'end-message' },
              ],
            },
            {
              id: 'update-yes',
              message: 'What field would you like to update?',
              trigger: 'update-fields',
            },
            {
              id: 'update-fields',
              options: [
                { value: 'name', label: 'Name', trigger: 'update-name' },
                { value: 'allergies', label: 'allergies', trigger: 'update-allergies' },
                { value: 'favFoods', label: 'Favorite Food', trigger: 'update-favFood' },
              ],
            },
            {
              id: 'update-name',
              update: 'name',
              trigger: '7',
            },
            {
              id: 'update-allergies',
              update: 'allergies',
              trigger: '7',
            },
            {
              id: 'update-favFood',
              update: 'favFood',
              trigger: '7',
            },
            {
              id: 'end-message',
              message: 'Thanks! Your data was submitted successfully!',
              end: true,
            },
          ]}
          floating
          opened={opened}
          toggleFloating={this.toggleFloating}
        />
      );
    } if (window.previous === 'login') {
      window.previous = '/';
      return (
        <ChatBot
          headerTitle="C.A.I.N."
          speechSynthesis={{ enable: true, lang: 'en', voice: voices[4] }}
          recognitionEnable
          steps={[
            {
              id: '1',
              message: `Welcome back ${user}!, I am 'CAIN'. 
              The Client, Appitite, Indulgence, Network.`,
              trigger: '3',
            },
            {
              id: '3',
              message: `Let me know if I can be of assistance. 
              If you have yet to familiarize yourself with me, 
              you may type help for a list of commands`,
              trigger: 'wait',
            },
            {
              id: 'wait',
              message: "I'll be right over here if you need anything.",
              end: true,
            },
          ]}
          floating
          opened={opened}
          toggleFloating={this.toggleFloating}
        />
      );
    }
    return (
      <ChatBot
        headerTitle="C.A.I.N."
        speechSynthesis={{ enable: true, lang: 'en', voice: voices[4] }}
        recognitionEnable
        steps={[
          {
            id: '1',
            message: '',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'How can I help?',
            trigger: '4',
          },
          // {
          //   id: 'wait',
          //   message: "I'll be right over here if you need anything.",
          //   trigger: '4',
          // },
          {
            id: '4',
            message: '',
            user: true,
            trigger: '5',
          },
          {
            id: '5',
            message: 'To do, add list of commands',
            trigger: 'favFood',
          },
          {
            id: 'favFood',
            user: true,
            validator: (value) => {
              if (value) {
                this.setState({ favFood: value });
                return true;
              }
              return true;
            },
            trigger: '6',
          },
          {
            id: '6',
            message: 'Fuck yeah, {previousValue}!!!',
            trigger: '7',
          },
          {
            id: '7',
            message: 'Would you like to update any of the previous fields?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: 'update-name' },
              { value: 'allergies', label: 'allergies', trigger: 'update-allergies' },
              { value: 'favFoods', label: 'Favorite Food', trigger: 'update-favFood' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-allergies',
            update: 'allergies',
            trigger: '7',
          },
          {
            id: 'update-favFood',
            update: 'favFood',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
        floating
      />
    );
  }
}


export default GreetForm;
