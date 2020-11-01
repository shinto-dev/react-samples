// GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn
// Use https://jscomplete.com/playground to try this

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const {avatar_url, name, company} = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={avatar_url} />
        <div className="info">
          <div className="name">{name}</div>
          <div className="company">{company}</div>
        </div>
    	</div>
    );
  }
}

// same using function component
const Card = ({profile:{name, company, avatar_url}})=> {
    return (
      <div className="github-profile">
        <img src={avatar_url} />
      <div className="info">
        <div className="name">{name}</div>
        <div className="company">{company}</div>
      </div>
      </div>
  );
}

const Form = ({onSubmit}) => {
    const [userName, setUserName] = useState("");
    
    const handleSubmit = async event=>{
      event.preventDefault();
      const resp = await axios.get(`https://api.github.com/users/${userName}`)
      onSubmit(resp.data);
      setUserName('');
    };
    
    return (
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Github username"
          value = {userName}
          onChange={(event)=> setUserName(event.target.value)}
          />
        <button>Search</button>
      </form>
    )
  }

const App = (props)=> {
const [profiles, setProfiles] = useState([]);
const addNewProfile = (profile)=> {
  setProfiles([profile, ...profiles])
}

return (
  <div>
        <div className="header">{props.title}</div>
      <Form onSubmit={addNewProfile} />
      <CardList profiles={profiles} />
  </div>
);
}

// todo: Handle errors
// todo: Validation

// Ref example to read the form element
const Form = () => {
  const userNameInput = React.createRef();
  
  const handleSubmit = event=>{
    event.preventDefault();
    console.log(userNameInput.current.value)
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Github username" ref={userNameInput}/>
      <button>Search</button>
    </form>
  )
}