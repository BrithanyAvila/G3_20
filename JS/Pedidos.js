var UrlPedidos =  'http://52.152.236.67:90/G3_20/controller/Pedido_Proveedor.php?opc=GetPedidos';
var UrlPostPedido = ' http://52.152.236.67:90/G3_20/controller/Pedido_Proveedor.php?opc=InsertPedido';
var UrlGetPedido = '  http://52.152.236.67:90/G3_20/controller/Pedido_Proveedor.php?opc=GetPedido';
var UrlPutPedido = ' http://52.152.236.67:90/G3_20/controller/Pedido_Proveedor.php?opc=UpdatePedido';
var UrlDeletePedido = ' http://52.152.236.67:90/G3_20/controller/Pedido_Proveedor.php?opc=DeletePedido';

$(document).ready(function(){
CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
                '<td>'+ MiItems[i].DETALLE +'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                '<td>'+ MiItems[i].TOTAL +'</td>'+
                '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarPedido('+ MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-outline-danger" id="btneliminar" onclick="EliminarPedido('+ MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.PedidosProveedor').html(Valores);
            }
        }
    });
}

function AgregarPedido(){
    var datospedido={
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al Crear Pedido')
        }
    });
    alert('Pedido Agregado')
}

function CargarPedido(id){
    var datospedido = {
        ID: id
    };
    var datospedidojson = JSON.stringify(datospedido);
    
    $.ajax({
        url: UrlGetPedido,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentype: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar= '<input type="submit" id="btnactualizar" onclick="ActualizarPedido('+ MiItems[0].ID +')" value="Actualizar Pedido" class="btn btn-secondary">';
            $('#btnPedido').html(btnactualizar);
        }
    });
}

function ActualizarPedido(id){
    var datospedido={
        ID: id,
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);
    $.ajax({
        url: UrlPutPedido,
        type: 'PUT',
        data: datospedidojson,
        datatype:'JSON',
        contenttype: 'application/json',
        success: function (reponse){
            console.log(reponse);
        },
        error:function(){
            alert('Error al Actualizar')
        }
    });
    alert('Pedido Actualizada')
}

function EliminarPedido(id){
    var datospedido = {
        ID: id
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data: datospedidojson,
        datatype: 'JSON',
        contentype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al Eliminar Pedido')
        }
    });
    alert("Pedido Eliminado");
}