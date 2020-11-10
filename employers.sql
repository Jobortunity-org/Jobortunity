DROP TABLE IF EXISTS employers;
CREATE TABLE employers (    
    id SERIAL PRIMARY KEY,    
    fullname VARCHAR(255),    
    email VARCHAR(255),    
    pass VARCHAR(255),    
    phonenumber  VARCHAR(255),
    DOB VARCHAR(255),
    companyname VARCHAR(255),
    companylocation VARCHAR(255),
    companyindustry VARCHAR(255)
    );

    INSERT INTO employers (fullname, email, pass, DOB,phonenumber, companyname,companylocation,companyindustry) VALUES ('aghead albalkhi', 'aghyadalbalkhi@gmail.com','301@code','0785144005', '2018-07-22','Jobopurtititit','amman-jordan','IT');
