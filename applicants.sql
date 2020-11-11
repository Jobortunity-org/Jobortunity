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

    INSERT INTO applicants (fullname, email, pass,phonenumber, DOB,jobtitle, applicantaddress, aboutme, achievement,images, video) VALUES ('Lubna Husam', 'lubna91@gmail.com','0000','0799968421', '1991-07-20','Chef', 'Turkey','I am a young woman filled with dreams and ambition. I have great skills in cooking, baking and decorating cakes.','Istanbul Week for Baking', 'https://aghyadalbalkhi-asac.github.io/jQuery-CDN/images/lubna.png','https://www.youtube.com/embed/lCoc7MF1AaI');

    INSERT INTO applicants (fullname, email, pass,phonenumber, DOB,jobtitle, applicantaddress, aboutme, achievement,images, video) VALUES ('Amal Mohammad', 'amal2000@gmail.com','0000','0798568421', '2000-04-30','Content Writer', 'Jordan','I am a passionate content writer with high ability to deliver the idea and to express.','Best Short Story-JU', 'https://aghyadalbalkhi-asac.github.io/jQuery-CDN/images/amal.jpg','https://drive.google.com/file/d/13lwzanNjqzNTPYJKvoxRdEUsx0J_0NUL/preview');

    INSERT INTO applicants (fullname, email, pass,phonenumber, DOB,jobtitle, applicantaddress, aboutme, achievement,images, video) VALUES ('Emma Jones', 'emma2004@gmail.com','0000','055598568421', '2004-08-10','Content Writer', 'USA','Despite the anxiety and autism, I chose to go through life positively so I learned programming in order to be productive.','Best website- Code Fellows','https://aghyadalbalkhi-asac.github.io/jQuery-CDN/images/emma.png','https://www.youtube.com/embed/D4Hapmm9YiY ');