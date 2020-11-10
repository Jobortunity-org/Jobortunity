DROP TABLE IF EXISTS applicants;
CREATE TABLE applicants (    
    id SERIAL PRIMARY KEY,    
    fullname VARCHAR(255),    
    email VARCHAR(255),    
    pass VARCHAR(255),    
    phonenumber  VARCHAR(255),
    DOB VARCHAR(255),
    jobtitle VARCHAR(255),    
    applicantaddress VARCHAR(255),    
    aboutme text,    
    achievement VARCHAR(255),
    images VARCHAR(255),
    video VARCHAR(255) );

    INSERT INTO applicants (fullname, email, pass,phonenumber, DOB,jobtitle, applicantaddress, aboutme, achievement,images, video) VALUES ('Hadeel Husam', 'hadeelh@gmail.com','401@code','0785100055', '2001-07-20','Full Stack Developer ', 'Canada Tornto','Queen of sleep','48 of counting sleeping', 'https://love-words.net/wp-content/uploads/2018/04/unnamed-file-729.jpg','https://www.youtube.com/embed/8abEHBlbTSA');