import React from 'react';
import ChatBot from 'react-simple-chatbot';

class GreetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allergies: [],
      favFood: '',
    };
  }

  render() {
    const { allergies, favFood } = this.state;
    const { user } = this.props;
    const voices = speechSynthesis.getVoices();
    const setVoice = () => speechSynthesis.voice = voices[4]
    return (
      <ChatBot
        headerTitle="C.A.I.N."
        speechSynthesis={{ enable: true, lang: 'en' }}
        steps={[
          {
            id: '1',
            message: `Hello ${user}, I am 'CAIN' (Client, Appitite, Indulgence, Network).`,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Please tell me if you have any allergies!\nYou can list them below, separated by a space',
            trigger: 'allergies',
          },
          {
            id: 'allergies',
            user: true,
            validator: (value) => {
              if (value) {
                const allergy = value.split(' ');
                this.setState({ allergies: allergy });
                return `The following allergies: ${allergies.join(',')} have been saved`;
              }
              return true;
            },
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
            trigger: '7',
            validator: (value) => {
              if (value) {
                this.setState({ favFood: value });
                return `Fuck yeah, ${favFood}!!!`;
              }
              return true;
            },
          },
          {
            id: '7',
            message: 'Would you like to update some field?',
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
      />
    );
  }
}

export default GreetForm;
