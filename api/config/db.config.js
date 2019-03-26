const config = {
    whiteList: ["http://localhost:4200"],
    recreateDB: false,
    dbLocal: {
        dbname: "sql10284795",
        username: "sql10284795",
        password: "j4ALCJYcFG",
        options: {
            host: "sql10.freemysqlhosting.net",
            port: 3306,
            dialect: "mysql"
        }
    },
    dbDev: {
        dbname: "sql10284795",
        username: "sql10284795",
        password: "j4ALCJYcFG",
        options: {
            host: "sql10.freemysqlhosting.net",
            port: 3306,
            dialect: "mysql"
        }
    },
    
    googleCloud: {
        keyfile: {
            type: "service_account",
            project_id: "datncsplayer",
            private_key_id: "e6f014e5988afce1d2fb7a2105eb4c9b46647972",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC4NoDt0yQbNSJ/\nOmRtKrWpON1YCbnKTJJxSDCAuQ4tP4CipalB1bWVvfz0WS6SBgSBWbwmXxETKUgC\nrC1ed/Io3m0GeNoxZ9RkdRlu7JkxYlsVIYXEw4UG9LZicSKHXHIj6Hm+LbkgkUQ4\nq4XMKiWDxaws/psUe20VQvi1H3785A7SuUHUsa3KUCfs25D6fUBNE52m10951Oqw\nLn+AYqK7Qjny8NpPR5O6vteL8zBgNnN1zFtyBqVibmBkg8An5+R9bUqPpapZcF0n\nYF3BAK+FuIsdEzvqe+Y5grRbM4ws8giYN7KC3BJ6k/bLU3VyC/05PuiRtBVrOjf9\nyaK6Ww+HAgMBAAECggEAPYsAAfSDYI+c6dKRUKNvM4zq7gm5x2tTlYMfqTGqGdXY\nXP5pkLQcSV3Cz8OnumNGSAy5vjwOkU8+Xp41PhVmkt7Un8/qXY0puTIiABwNhiEs\n+t9LOJR1sgA5mqPffEeXXoXBfpb5/XZqy2AKgE4oYGC/B/07xFkD9ZF9U82k+EmL\na9MzS3QHyK/sGKMjhrFgZi3t/ZDsbUT1sL2bxY2wBAIB0b0DvCfHnhxChxhel72Y\njfSBWns9xjdLRrexeAVXJKUCxGRholne4g07B5WI3WkKNpxO7bNCfew/zaKkgEBf\nE/v2RQsfTNNYS5hsQpVvMyBI0IWGwSFSVDd2jaZwEQKBgQDpW7CtgZ8WKa9KgBLq\nn//xyPNaf6P38XUasXNgCmjGa27fNLwJBw74m9TwCcIQulkC1b/Prh3bs04WH7Vu\neZ/SxYihhn5YE6ROEwGPoEJEQxRrQjntnukBH8t/X5zOlaAj9v+BTfvzTEDouCB2\ntiXjM1S9dKMh0SofZikx6JUTjwKBgQDKFhwglnljFg5mUm1JCk5EnjgWxorbnesd\nCcnKYwGGJORGac1xB7uYj7ubilewI2/Jj6Hr5f8p5MHev1oVxgHVGzdjplRk9bkm\nYgpCF83t4sc0kNfQi7z8BtL6o+Rx9Kjy+M4YMmpgrluZvRb1fEMOkeY9k+bDVDCJ\nVWSdVIboiQKBgEwkZtm2WbpZj6C3eXSlEFZMQ1tcGpxkZNl43TSRMO7NTzf1dQVd\nED1+W1SXWoMqyrBqHlQddBCjyO7fGcwaU1PqsFJEGCWVAx+WhAPhPr4XRSpaSZyH\nJXAAd93vzLJ7j+0sQuJmF7ejQeqtaapSdLpVnWjUDgaSwTPNmdN3GG1xAoGABIYI\nLSaRIwmsWtf/gEINzHVqNgBNvWrEh4rfjHs43oLW5UibA6uzpE+bWHj5S4UPjIh9\njGVCl/J58H2CC7i588Y/MCjZ/MSPV2+cYSxdPLT11pRjcFSgb1fLwzaF95MNcRrm\nqh3+yZk9jaxw5h/Y9GuJptk3simhSIGz1d29g1kCgYAm28SMWiceTOFyNeFD0Uju\n9dxWh9qn0cdLVLfVJKFaXLetYZsDys3D/OkGHlarUzoH0Pl6VbEqkiTlgxEegF/j\n2P9pUAgynkEMuJdZGamdBe4vNzFpuaxgrDA6uw9qgDABHJi/D/KMvCMtYDnf2ojt\nNxKQszywNOMlwqt74pfBqg==\n-----END PRIVATE KEY-----\n",
            client_email: "firebase-adminsdk-uem43@datncsplayer.iam.gserviceaccount.com",
            client_id: "114015951606317026023",
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
            client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uem43%40datncsplayer.iam.gserviceaccount.com"
        },
        databaseURL: "https://datncsplayer.firebaseio.com",
    },
    databaseURL: "https://datncsplayer.firebaseio.com",

    jwt: {
        key: "SGF2ZSB0byBkZWFsIHdpdGggQmFzZTY0IGZvcm1hdD8gVGhlbiB0aGlzIHNpdGUgaXMgbWFkZSBmb3IgeW91ISBVc2UgdGhlIHN1cGVyIHNpbXBsZSBvbmxpbmUgZm9ybSBiZWxvdyB0byBkZWNvZGUgb3IgZW5jb2RlIHlvdXIgZGF0YS4gSWYgeW91J3JlIGludGVyZXN0ZWQgYWJvdXQgdGhlIGlubmVyIHdvcmtpbmdzIG9mIHRoZSBCYXNlNjQgZm9ybWF0LCBqdXN0IHJlYWQgdGhlIGRldGFpbGVkIGRlc2NyaXB0aW9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHBhZ2UuIFdlbGNvbWUh"
    },

    encodeDecode: {
        baseSecret: "fsdfsdfsdfsdgvzxbcvnvbmfghfdyertegsdfdjghhhhyujhfdhsgdfgdfgdfhdfhfhfghfghgf128763912",
        baseContent: "TXtAzPOfceGVhQoYygxaldCMNZjnwvUpIEHFSbLKRBWJrmquDski",
        lengthBaseContent: 52
    },

    email: {
        port: 465,
        host: "smtp.gmail.com",
        emailName: "The System Connecting Football Team",
        emailAddress: "manjacky.it14@gmail.com",
        password: "Anhtuan@2804"
    }
}
module.exports = config;