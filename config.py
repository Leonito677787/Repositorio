class Config:
    SCRET_KEY ='owibeiwhiuhefiblawkd'
    DEBUG     =True

    class DevelopmentConfig(Config):
        MYSQL_HOST  ='localhost'
        MYSQL_USER  ='root'
        MYSQL_PASSWORD  ='mysql'
        MYSQL_DB    ='ourpath'

config  ={
    'development':DevelopmentConfig
}

          