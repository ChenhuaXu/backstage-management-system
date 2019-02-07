<template>
  <v-card class="user-manage p-y-b-2">
    <v-card-title>
      <v-btn color="primary" @click="operate(null)">新增</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="queryForm.name"
        append-icon="search"
        label="请输入用户名称查找"
        @click:append="query(1, pagination.rowsPerPage)"
        hide-details
        autofocus>
      </v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="tableData"
      :rows-per-page-items="pageSizes"
      :total-items="pagination.totalItems"
      :pagination.sync="pagination">
      <template slot="items" slot-scope="props">
        <td>
          <v-tooltip right>
            <span slot="activator">{{ props.item.id }}</span>
            <span>{{ props.item.id }}</span>
          </v-tooltip>
        </td>
        <td>
          <v-tooltip right>
            <span slot="activator">{{ props.item.name }}</span>
            <span>{{ props.item.name }}</span>
          </v-tooltip>
        </td>
        <td>
          <v-tooltip right>
            <span slot="activator">{{ props.item.role }}</span>
            <span>{{ props.item.role }}</span>
          </v-tooltip>
        </td>
        <td>
          <v-chip small :color="props.item.status === '0' ? 'success' : 'error'" text-color="white">{{ props.item.status === '0' ? '启用' : '停用' }}</v-chip>
        </td>
        <td class="text-center" width="200">
          <v-btn fab small color="warning" @click.native.stop="operate(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn fab small color="error" @click.native.stop="remove(props.item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        您所查找的 "{{ queryForm.name }}" 未匹配到任何结果。
      </v-alert>
    </v-data-table>

    <v-pagination v-model='pagination.page' :length='totalPages' :total-visible="7" circle></v-pagination>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ modalTitle }}用户</v-card-title>
        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="form.name"
              :rules="nameErrors"
              label="用户名称"
              required>
            </v-text-field>
            <v-select
              v-model="form.role"
              :rules="roleErrors"
              :items="roleList"
              item-text="label"
              item-value="value"
              label="关联角色">
            </v-select>
            <v-select
              v-model="form.status"
              :rules="statusErrors"
              :items="statusList"
              item-text="label"
              item-value="value"
              label="启用状态">
            </v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="cancelOperate">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="confirmOperate">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      top
      :timeout="3000">
      {{ snackbarText }}
    </v-snackbar>
  </v-card>
</template>

<script>
import { systemApi } from '@/apis'
export default {
  name: 'user-manage',
  data () {
    return {
      queryForm: {
        name: ''
      },
      headers: [
        { text: 'ID', value: 'id' },
        { text: '用户名称', value: 'name' },
        { text: '关联角色', value: 'role' },
        { text: '启用状态', value: 'status' },
        { text: '操作', value: '', align: 'center', sortable: false }
      ],
      tableData: [],
      loading: false,
      pageSizes: [5, 10, 20, 50],
      pagination: {
        page: 1,
        rowsPerPage: 5,
        // sortBy: 'id',
        descending: true,
        totalItems: 0
      },
      roleList: [],
      statusList: [
        {
          label: '启用',
          value: '0'
        },
        {
          label: '停用',
          value: '1'
        }
      ],
      dialog: false,
      modalTitle: '',
      form: {
        name: '',
        role: '',
        status: '0'
      },
      valid: false,
      nameErrors: [
        v => !!v || '请输入用户名称'
      ],
      roleErrors: [
        v => !!v || '请选择关联角色'
      ],
      statusErrors: [
        v => !!v || '请选择启用状态'
      ],
      rcdOpeType: '0',
      snackbar: false,
      snackbarText: ''
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  methods: {
    query (page, size) {
      this.loading = true
      systemApi.userList({
        name: this.queryForm.name,
        currentPage: page,
        pageSize: size
      }).then(({resultCode, result, msg}) => {
        this.pagination.page = page
        this.pagination.totalItems = result.totalNum
        this.tableData = result.dataList
        this.loading = false
      })
    },

    operate (params) {
      this.dialog = true
      this.rcdOpeType = params ? '1' : '0'
      this.modalTitle = params ? '修改' : '新增'
      if (!params) return false
      this.form.name = params.name
      this.form.role = params.role
      this.form.status = params.status
    },

    confirmOperate () {
      if (this.$refs.form.validate()) {
        let [request, params] = [null, {}]
        if (this.rcdOpeType === '0') {
          request = systemApi.createUser
          params = {}
        } else {
          request = systemApi.updateUser
          params = {}
        }
        request(params).then(({resultCode, result, msg}) => {
          this.snackbarText = msg
          this.snackbar = true
          this.dialog = false
          this.query(this.pagination.page, this.pagination.rowsPerPage)
          this.cancelOperate()
        })
      } else {
        return false
      }
    },

    cancelOperate () {
      this.dialog = false
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },

    remove (params) {
      systemApi.removeUser().then(({resultCode, result, msg}) => {
        this.snackbarText = msg
        this.snackbar = true
        this.query(this.pagination.page, this.pagination.rowsPerPage)
      })
    },

    async getRoleList () {
      let { result } = await systemApi.roleList()
      this.roleList = result
    }
  },
  watch: {
    'pagination.page' (val) {
      this.query(val, this.pagination.rowsPerPage)
    },
    'pagination.rowsPerPage' (val) {
      this.query(1, val)
    }
  },
  mounted () {
    this.query(this.pagination.page, this.pagination.rowsPerPage)
    this.getRoleList()
  }
}
</script>