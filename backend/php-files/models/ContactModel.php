<?php
class ContactModel{

    public function putInDatabasebase($clientmessage){
        $name = $clientmessage["name"];
        $email = $clientmessage["email"];
        $message = $clientmessage["message"];
        
        $to = "jngusly@gmail.com";

        $headers = "from: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $subject = "Message from $name";

        if (mail($to, $subject, $message, $headers)){
            return true;
        } 
            return false;
        }
}