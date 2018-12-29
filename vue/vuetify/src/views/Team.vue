<template>
    <div class="team">
        <h1 class="subheading grey--text">Team</h1>

        <v-container class='my-5'>

            <v-layout row wrap>
                <v-flex xs12 sm6 md4 lg3 v-for="person in teams" :key="person.id">
                    <v-card flat class="text-xs-center ma-2">
                        <v-responsive class="pt-4">
                            <v-avatar color="teal" size="100" class="grey lighten-2">
                                <span class="white--text headline">{{person.avatar}}</span>
                            </v-avatar>
                        </v-responsive>

                        <v-card-text>
                            <div class="subheading">{{person.name}}</div>
                            <div class="grey--text">{{person.role}}</div>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn flat color="grey">
                                <v-icon small left>message</v-icon>
                                <span>Message</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>

        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                teams: [
                    {id: 1,name: 'Artu Di Tu',role: 'WebDev', avatar: 'R2D2'},
                    {id: 2,name: 'Jon Doe',role: 'Programmer', avatar: 'JD'},
                    {id: 3,name: 'Salomon',role: 'Manager', avatar: 'Sal'},
                    {id: 4,name: 'Unknown',role: 'CTO', avatar: 'Unk'},
                    {id: 5,name: 'Kung Lao',role: 'Ninja', avatar: 'KL'}
                ]
            };
        }
    };
</script>
