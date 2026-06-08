pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                echo 'Repository cloned successfully'
            }
        }

        stage('Build') {
            steps {
                bat 'py --version'
            }
        }

        stage('Test') {
            steps {
                bat 'py -m py_compile app.py'
            }
        }

        stage('Deploy') {
            steps {
                bat 'echo Deployment Successful'
            }
        }
    }
}