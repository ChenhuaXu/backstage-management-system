<template>
  <div class="user-manage">
    <header>
      <Button type="primary" @click="operate(null)">新增</Button>
      <section class="pull-right">
        <Input v-model.trim="queryForm.name" type="text" placeholder="请输入用户名称" style="width: 200px" />
        <Button type="primary" @click="query(1, pageSize)">查询</Button>
      </section>
    </header>
    <main class="m-y-2">
      <Table highlight-row ref="table" :columns="columns" :data="tableData"></Table>
    </main>
    <footer class="text-right">
      <Page
        :total="totalCount"
        :page-size="pageSize"
        :page-size-opts="[10, 20, 30, 40]"
        @on-change="currentPageChange"
        @on-page-size-chang="pageSizeChange"
        show-total
        show-elevator show-sizer />
    </footer>
    <!-- 新增修改弹窗 -->
    <Modal
      v-model="modalVisible"
      :title="`${modalTitle}用户`"
      :mask-closable="false"
      :closable="false"
      @on-ok="confirmOperate"
      @on-cancel="cancelOperate">
      <Form ref="form" :model="form" :label-width="80">
        <FormItem label="用户名称" prop="name">
          <Input type="text" v-model="form.name"></Input>
        </FormItem>
        <FormItem label="绑定角色" prop="role">
          <Select v-model="form.role">
            <Option
              v-for="item in roleList"
              :key="item.value"
              :value="item.value"
              :label="item.label">
            </Option>
          </Select>
        </FormItem>
        <FormItem label="启用状态" prop="status">
          <RadioGroup v-model="form.status">
            <Radio label="0">启用</Radio>
            <Radio label="1">禁用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
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
      loading: false,
      tableData: [],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '用户名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '关联角色',
          key: 'role',
          align: 'center'
        },
        {
          title: '启用状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: params.row.status === '0' ? 'success' : 'error',
                  size: 'small'
                }
              }, params.row.status === '0' ? '启用' : '禁用')
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.operate(params)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      modalVisible: false,
      modalTitle: '',
      roleList: [],
      form: {
        name: '',
        role: '',
        status: '0'
      }
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
        this.tableData = result.dataList
        this.totalCount = result.totalNum
        this.currentPage = page
        this.loading = false
      })
    },

    currentPageChange (page) {
      this.currentPage = page
      this.query(page, this.pageSize)
    },

    pageSizeChange (size) {
      this.pageSize = size
      this.query(1, size)
    },

    operate (params) {
      this.modalVisible = true
      this.rcdOpeType = params ? '1' : '0'
      this.modalTitle = params ? '修改' : '新增'
      if (!params) return false
      // Todo
    },

    confirmOperate () {
      let [request, params] = [null, {}]
      if (this.rcdOpeType === '0') {
        request = systemApi.createUser
        params = {}
      } else {
        request = systemApi.updateUser
        params = {}
      }
      request(params).then(({resultCode, result, msg}) => {
        this.$message.success(msg)
        this.modalVisible = false
        this.query(this.currentPage, this.pageSize)
        this.cancelOperate()
      })
    },

    cancelOperate () {
      this.modalVisible = false
      this.form = {
        name: '',
        role: '',
        status: '0'
      }
    },

    remove (params) {
      systemApi.removeUser().then(({resultCode, result, msg}) => {
        this.$message.success(msg)
        this.query(this.currentPage, this.pageSize)
      })
    },

    async getRoleList () {
      let { result } = await systemApi.roleList()
      this.roleList = result
    }
  },
  mounted () {
    this.query(this.currentPage, this.pageSize)
    this.getRoleList()
  }
}
</script>

<style lang="less" scoped>
.user-manage {
}
</style>