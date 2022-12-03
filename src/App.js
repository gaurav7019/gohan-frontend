function App() {
  return (
    <div className="App">
      <h1>Pending Requests</h1>
      <div className="notifStack">
        {
          notifs.map(notif => {
            return (<NotifCard notifTitle={notif.title} notifMessage={notif.message} />)
          })
        }
      </div>
    </div>
  );
}

export default App;
