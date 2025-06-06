const pool =  require("./pool");

async function createUser(name, surname, email, password) {
    try {
        
        const newUser = await pool.query(`
            INSERT INTO users (name, surname, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id           
        `, [name, surname, email,password]);

        const userId = newUser.rows[0].id;

        await pool.query(`
            INSERT INTO memberships (id_user, member, admin)
            VALUES ($1, $2, $3)
        `, [userId, false, false]);

    } catch(error) {
        console.error(error);
        throw error;
    }
    
};

async function getUserByEmail(email) { //we use email as a usenname
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return rows[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function getUserById(id) {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM users
            JOIN memberships ON memberships.id_user = users.id  
            WHERE id = $1`
        , [id]);
        return rows[0];
    } catch(error) {
        console.error(error);
        throw error;
    }
};

async function newMessage(authorId, title, content, date) {
    try {

        await pool.query(`
            INSERT INTO messages (author_id, title, content, date)
            VALUES ($1, $2, $3, $4)
        `, [authorId, title, content, date]);

    } catch(error) {;
        throw error;
    }
};

async function getAllMessages() {
    try {
        const { rows } = await pool.query(`
            SELECT title, content, date, name, messages.id AS id FROM messages
            JOIN users ON author_id = users.id
            ORDER BY date DESC
        `);
        return rows;
    }catch(error) {
        console.error(error);
        throw error;
    }
};

async function updateMembership(userId) {
    try {
        await pool.query(`
        UPDATE memberships
        SET member = true
        FROM users 
        WHERE users.id = memberships.id_user 
        AND users.id = $1
        `, [userId]);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

async function updateAdmin(userId) {
    try {
        await pool.query(`
        UPDATE memberships
        SET admin = true
        WHERE id_user = $1
        `, [userId]);
    }catch(error) {
        console.error(error);
        throw error;
    }
}

async function deleteMessage(messId) {
    try {
        await pool.query(`DELETE FROM messages WHERE id = $1`, [messId]);
    }catch(error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    newMessage,
    getAllMessages,
    updateMembership,
    deleteMessage,
    updateAdmin
};