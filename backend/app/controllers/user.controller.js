  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content - Successfully accessed");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content - Successfully accessed");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content - Successfully accessed");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content - Successfully accessed");
  };