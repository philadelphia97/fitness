async function getUserById(userId) {
    try {
      const { rows: [ user ] } = await client.query(`
        SELECT *
        FROM users
        WHERE id=${ }
      `);
  
      if (!user) {
        throw {
          name: "UserNotFoundError",
          message: "A user with that id does not exist"
        }
      }
  
      
  
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getUserByUsername(userName) {
    try {
      const {rows : [user]} = await client.query(`
      SELECT *
      FROM users
      WHERE username = $1
      `, [ username]);
    
      if (!user) {
        throw {
          name: "userNotFOUNDERROR",
          message: "a user with that username does not exist"
        }
      } return user;
    } catch(error) {
      throw error;
    }
    }

    