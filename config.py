class Config:
    SECRET_KEY = 'awdsawdsawdsawdsawdsawds'
    DEBUG = True


class DevelopmentConfig(Config):
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'mysql'
    MYSQL_DB = 'ourpath'
    MYSQL_PORT = 3306


config = {
    'development': DevelopmentConfig
}
