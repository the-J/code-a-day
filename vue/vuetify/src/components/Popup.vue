<template>
    <v-dialog max-width="600px">
        <!--this will be activator-->
        <v-btn flat slot="activator" class="success">Add new project</v-btn>

        <!--this will be content-->
        <v-card>
            <v-card-title>
                <h2>Title</h2>
            </v-card-title>

            <v-card-text>
                <v-form class="px-3">
                    <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
                    <v-textarea label="Information" v-model="content" prepend-icon="edit"></v-textarea>
                    <v-btn flat class="success mx-0 mt-3" @click="submit">Add Project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                content: ''
            }
        },
        methods: {
            submit() {
                console.log(this.title, this.content)
            }
        }

    };
</script>
