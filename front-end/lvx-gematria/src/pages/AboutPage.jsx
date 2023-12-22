import Container from 'react-bootstrap/Container';

function About() {
  return (
    <Container style={{backgroundColor: "rgba(128, 128, 128, 0.8)",
		    color: "white", 
		    fontSize: "Large",
   		    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    overflowY: "auto",
		    marginTop: "3%",
		    marginBottom: "3%",
		    padding: "3%"
    		}}>
        <div>
      <h2>About LVX Gematria</h2>
      <p>
        Welcome to LVX Gematria, a project born from a deep passion for the 
        intersection of meditation, analysis, and the mystical practice of Gematria.
      </p>
      <h3>My Journey</h3>
      <p>
        Building LVX Gematria has been more than just a technical challenge; it has 
        been a journey of personal and spiritual growth. As a developer, I embarked on 
        this journey to create a tool that not only serves as a resource for understanding 
        Gematria but also as a platform that resonates with the intricate beauty of this 
        ancient practice.
      </p>
      <h3>What Gematria Means to Me</h3>
      <p>
        To me, Gematria is not just a method of interpreting numbers and words. It is a 
        bridge that connects the analytical mind with the profound depths of meditation. 
        It allows me to link ideas and insights, tapping into the power of my 
        subconscious. Through Gematria, I find a unique harmony between logic and 
        intuition, between the known and the mystical.
      </p>
      <h3>The Vision Behind LVX Gematria</h3>
      <p>
        With LVX Gematria, my goal is to share this experience with you. The app is 
        designed to be more than just a calculator or a dictionary; it is a companion in 
        your exploration of the mystical world of numbers and their connections to 
        language and meaning. Whether you are a seasoned practitioner or new to 
        Gematria, I hope this app helps you unlock new perspectives and insights.
      </p>
      <p>
        Thank you for being a part of this journey. I am excited to see where it takes us.
      </p>
      </div>
    </Container>
  );
}

export default About;
