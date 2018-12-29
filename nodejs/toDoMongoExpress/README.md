Simple TODO app with nodejs, express and mongodb

### setup (ubuntu 18.04)
* install mongodb - [mongo manual](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
    ```
    $   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
    $   echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
    $   sudo apt-get update
    $   sudo apt-get install -y mongodb-org
    ```
 * start mongo
    ```
    $   sudo service mongod start
    ```
 * Verify that MongoDB has started successfully
    ```
    Verify that the mongod process has started successfully by checking the contents of 
    the log file at /var/log/mongodb/mongod.log for a line reading
    
    $  [initandlisten] waiting for connections on port 27017
    ```
