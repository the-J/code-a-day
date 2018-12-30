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
                <!--vanillaJS ref-->
                <v-form class="px-3" ref="projectForm">
                    <v-text-field
                            label="Title"
                            v-model="title"
                            prepend-icon="folder"
                            :rules="inputRules"></v-text-field>
                    <v-textarea
                            label="Information"
                            v-model="content"
                            prepend-icon="edit"
                            :rules="inputRules"></v-textarea>

                    <v-menu>
                        <v-text-field
                                :value="formattedDate"
                                slot="activator"
                                label="Due Date"
                                prepend-icon="date_range"></v-text-field>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>

                    <v-spacer></v-spacer>

                    <v-btn flat class="success mx-0 mt-3" @click="submit">Add Project</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

    import format from 'date-fns/format';
    import db from '@/fb.js';

    export default {
        data() {
            return {
                title: '',
                content: '',
                due: null,
                inputRules: [
                    v => v.length >= 3 || 'Minimum 3 characters'
                ]
            };
        },
        methods: {
            submit() {
                if (this.$refs.projectForm.validate()) {
                    console.log(this.title, this.content);

                    const project = {
                        title: this.title,
                        content: this.content,
                        due: format(this.due, 'Do MMM YYYY'),
                        person: 'New from web',
                        status: 'ongoing'
                    };

                    db.collection('projects')
                        .add(project)
                        .then(() => console.log('saved to db'))
                        .catch(err => console.log({ err }));
                }
            }
        },
        computed: {
            formattedDate() {
                return this.due ? format(this.due, 'Do MMM YYYY') : '';
            }
        }

    };
</script>
