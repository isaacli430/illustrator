FasdUAS 1.101.10   ��   ��    k             l      ��  ��   *********************************************************

ADOBE SYSTEMS INCORPORATED 
Copyright 2008-2010 Adobe Systems Incorporated 
All Rights Reserved 

NOTICE:  Adobe permits you to use, modify, and 
distribute this file in accordance with the terms
of the Adobe license agreement accompanying it.  
If you have received this file from a source 
other than Adobe, then your use, modification,
or distribution of it requires the prior     
written permission of Adobe. 

********************************************************     � 	 	& * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 
 A D O B E   S Y S T E M S   I N C O R P O R A T E D   
 C o p y r i g h t   2 0 0 8 - 2 0 1 0   A d o b e   S y s t e m s   I n c o r p o r a t e d   
 A l l   R i g h t s   R e s e r v e d   
 
 N O T I C E :     A d o b e   p e r m i t s   y o u   t o   u s e ,   m o d i f y ,   a n d   
 d i s t r i b u t e   t h i s   f i l e   i n   a c c o r d a n c e   w i t h   t h e   t e r m s 
 o f   t h e   A d o b e   l i c e n s e   a g r e e m e n t   a c c o m p a n y i n g   i t .     
 I f   y o u   h a v e   r e c e i v e d   t h i s   f i l e   f r o m   a   s o u r c e   
 o t h e r   t h a n   A d o b e ,   t h e n   y o u r   u s e ,   m o d i f i c a t i o n , 
 o r   d i s t r i b u t i o n   o f   i t   r e q u i r e s   t h e   p r i o r           
 w r i t t e n   p e r m i s s i o n   o f   A d o b e .   
 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *   
  
 l     ��������  ��  ��        l     ��  ��    I C This script creates a new document, then moves 5 existing swatches     �   �   T h i s   s c r i p t   c r e a t e s   a   n e w   d o c u m e n t ,   t h e n   m o v e s   5   e x i s t i n g   s w a t c h e s      l     ��  ��    L F (ignoring pattern and gradient swatches) to a new swatch group titled     �   �   ( i g n o r i n g   p a t t e r n   a n d   g r a d i e n t   s w a t c h e s )   t o   a   n e w   s w a t c h   g r o u p   t i t l e d      l     ��  ��    M G CreateSwatchGroup. This script then creates a new group item comprised     �   �   C r e a t e S w a t c h G r o u p .   T h i s   s c r i p t   t h e n   c r e a t e s   a   n e w   g r o u p   i t e m   c o m p r i s e d      l     ��  ��    I C of 5 path items and applies each swatch of the new swatch group to     �   �   o f   5   p a t h   i t e m s   a n d   a p p l i e s   e a c h   s w a t c h   o f   t h e   n e w   s w a t c h   g r o u p   t o     !   l     �� " #��   "   one of the path items.    # � $ $ .   o n e   o f   t h e   p a t h   i t e m s . !  % & % l     ��������  ��  ��   &  '�� ' l   � (���� ( O    � ) * ) k   � + +  , - , I   	������
�� .miscactvnull��� ��� null��  ��   -  . / . r   
  0 1 0 I  
 ���� 2
�� .corecrel****      � null��   2 �� 3 4
�� 
kocl 3 m    ��
�� 
docu 4 �� 5��
�� 
prdt 5 K     6 6 �� 7��
�� 
caCS 7 m    ��
�� eCLSeCyM��  ��   1 o      ���� 0 docref docRef /  8 9 8 l   ��������  ��  ��   9  : ; : l   �� < =��   <   Create a new SwatchGroup    = � > > 2   C r e a t e   a   n e w   S w a t c h G r o u p ;  ? @ ? r    + A B A I   )���� C
�� .corecrel****      � null��   C �� D E
�� 
kocl D n     F G F m     ��
�� 
cSGr G 1    ��
�� 
aiAD E �� H��
�� 
prdt H K   ! % I I �� J��
�� 
pnam J m   " # K K � L L " C r e a t e S w a t c h G r o u p��  ��   B o      ����  0 swatchgroupref swatchGroupRef @  M N M l  , ,��������  ��  ��   N  O P O l  , ,�� Q R��   Q 3 - Get list of swatches in general swatch group    R � S S Z   G e t   l i s t   o f   s w a t c h e s   i n   g e n e r a l   s w a t c h   g r o u p P  T U T r   , 2 V W V n   , 0 X Y X 4   - 0�� Z
�� 
cSGr Z m   . /����  Y o   , -���� 0 docref docRef W o      ����  0 genswatchgroup genSwatchGroup U  [ \ [ l  3 3��������  ��  ��   \  ] ^ ] l  3 3�� _ `��   _ T N Collect 5 random swatches from the general swatch group and move to new group    ` � a a �   C o l l e c t   5   r a n d o m   s w a t c h e s   f r o m   t h e   g e n e r a l   s w a t c h   g r o u p   a n d   m o v e   t o   n e w   g r o u p ^  b c b r   3 8 d e d m   3 4����   e o      ���� 0 i   c  f g f W   9 � h i h k   E � j j  k l k r   E N m n m I  E J�� o��
�� .AiClkGAscaSW  @    cSGr o o   E F����  0 genswatchgroup genSwatchGroup��   n o      ���� 0 swatchesref swatchesRef l  p q p r   O ^ r s r I  O Z�� t��
�� .corecnte****       **** t n  O V u v u 2   R V��
�� 
cobj v o   O R���� 0 swatchesref swatchesRef��   s o      ���� 0 swatchcount swatchCount q  w x w r   _ r y z y I  _ n���� {
�� .sysorandnmbr    ��� nmbr��   { �� | }
�� 
from | m   c d����  } �� ~��
�� 
to   ~ o   g j���� 0 swatchcount swatchCount��   z o      ���� 0 swatchindex swatchIndex x   �  r   s � � � � n   s } � � � 4   v }�� �
�� 
cobj � o   y |���� 0 swatchindex swatchIndex � o   s v���� 0 swatchesref swatchesRef � o      ���� 0 currentswatch currentSwatch �  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   � < 6 New swatch group does not allow patterns or gradients    � � � � l   N e w   s w a t c h   g r o u p   d o e s   n o t   a l l o w   p a t t e r n s   o r   g r a d i e n t s �  ��� � Z   � � � ����� � F   � � � � � >  � � � � � n   � � � � � 1   � ���
�� 
pcls � n   � � � � � 1   � ���
�� 
colr � o   � ����� 0 currentswatch currentSwatch � m   � ���
�� 
tPTi � >  � � � � � n   � � � � � 1   � ���
�� 
pcls � n   � � � � � 1   � ���
�� 
colr � o   � ����� 0 currentswatch currentSwatch � m   � ���
�� 
tGDi � k   � � � �  � � � I  � ��� � �
�� .AiClkAShnull���    cSGr � o   � �����  0 swatchgroupref swatchGroupRef � �� ���
�� 
kSWt � o   � ����� 0 currentswatch currentSwatch��   �  ��� � r   � � � � � [   � � � � � o   � ����� 0 i   � m   � �����  � o      ���� 0 i  ��  ��  ��  ��   i =  = D � � � o   = @���� 0 i   � m   @ C����  g  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   � B < Updates swatch list with swatches moved to new swatch group    � � � � x   U p d a t e s   s w a t c h   l i s t   w i t h   s w a t c h e s   m o v e d   t o   n e w   s w a t c h   g r o u p �  � � � r   � � � � � I  � ��� ���
�� .AiClkGAscaSW  @    cSGr � o   � �����  0 swatchgroupref swatchGroupRef��   � o      ���� 0 swatchesref swatchesRef �  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   � h b Create new group art in the document and apply each swatch in the new swatch group to a path item    � � � � �   C r e a t e   n e w   g r o u p   a r t   i n   t h e   d o c u m e n t   a n d   a p p l y   e a c h   s w a t c h   i n   t h e   n e w   s w a t c h   g r o u p   t o   a   p a t h   i t e m �  � � � r   � � � � � I  � ����� �
�� .corecrel****      � null��   � �� ���
�� 
kocl � n  � � � � � m   � ���
�� 
caGP � o   � ����� 0 docref docRef��   � o      ���� 0 groupref groupRef �  � � � l  � ���������  ��  ��   �  � � � r   �
 � � � I  ����� �
�� .corecrel****      � null��   � � � �
� 
kocl � n  � � � � � m   � ��~
�~ 
caPA � o   � ��}�} 0 groupref groupRef � �| ��{
�| 
prdt � K   � � � �z � �
�z 
aiFP � m   � ��y
�y boovtrue � �x ��w
�x 
aiFC � n   �  � � � 1   � �v
�v 
colr � n   � � � � � 4   � ��u �
�u 
cobj � m   � ��t�t  � o   � ��s�s 0 swatchesref swatchesRef�w  �{   � o      �r�r 0 pathref1 pathRef1 �  � � � r  5 � � � J  - � �  � � � J   � �  � � � m   � � @J/\(� �  ��q � m   � � @{eG�z��q   �  � � � J   � �  � � � m   � � @pk33333 �  ��p � m   � � @x�z�G��p   �  � � � J  # � �  � � � m   � � @pk33333 �  ��o � m  ! � � @~z�G��o   �  ��n � J  #+ � �  � � � m  #& � � @J/\(� �  ��m � m  &) � � @{eG�z��m  �n   � n       �  � 1  04�l
�l 
aiEP  o  -0�k�k 0 pathref1 pathRef1 �  l 66�j�i�h�j  �i  �h    r  6] I 6Y�g�f
�g .corecrel****      � null�f   �e	
�e 
kocl n 8?

 m  ;?�d
�d 
caPA o  8;�c�c 0 groupref groupRef	 �b�a
�b 
prdt K  @U �`
�` 
aiFP m  CD�_
�_ boovtrue �^�]
�^ 
aiFC n  GS 1  OS�\
�\ 
colr n  GO 4  JO�[
�[ 
cobj m  MN�Z�Z  o  GJ�Y�Y 0 swatchesref swatchesRef�]  �a   o      �X�X 0 pathref2 pathRef2  r  ^� J  ^�  J  ^f  m  ^a�W�W2  �V  m  ad!! @��\(��V   "#" J  fn$$ %&% m  fi'' @pk33333& (�U( m  il)) @~z�G��U  # *+* J  nv,, -.- m  nq// @u������. 0�T0 m  qt11 @~z�G��T  + 2�S2 J  v~33 454 m  vy�R�R25 6�Q6 m  y|77 @��\(��Q  �S   n      898 1  ���P
�P 
aiEP9 o  ���O�O 0 pathref2 pathRef2 :;: l ���N�M�L�N  �M  �L  ; <=< r  ��>?> I ���K�J@
�K .corecrel****      � null�J  @ �IAB
�I 
koclA n ��CDC m  ���H
�H 
caPAD o  ���G�G 0 groupref groupRefB �FE�E
�F 
prdtE K  ��FF �DGH
�D 
aiFPG m  ���C
�C boovtrueH �BI�A
�B 
aiFCI n  ��JKJ 1  ���@
�@ 
colrK n  ��LML 4  ���?N
�? 
cobjN m  ���>�> M o  ���=�= 0 swatchesref swatchesRef�A  �E  ? o      �<�< 0 pathref3 pathRef3= OPO r  ��QRQ J  ��SS TUT J  ��VV WXW m  ��YY @�}
=p��X Z�;Z m  ��[[ @{eG�z��;  U \]\ J  ��^^ _`_ m  ��aa @u������` b�:b m  ��cc @~z�G��:  ] ded J  ��ff ghg m  ��ii @u������h j�9j m  ��kk @x�z�G��9  e l�8l J  ��mm non m  ��pp @�}
=p��o q�7q m  ��rr @{eG�z��7  �8  R n      sts 1  ���6
�6 
aiEPt o  ���5�5 0 pathref3 pathRef3P uvu l ���4�3�2�4  �3  �2  v wxw r  �yzy I ���1�0{
�1 .corecrel****      � null�0  { �/|}
�/ 
kocl| n ��~~ m  ���.
�. 
caPA o  ���-�- 0 groupref groupRef} �,��+
�, 
prdt� K  ���� �*��
�* 
aiFP� m  ���)
�) boovtrue� �(��'
�( 
aiFC� n  ����� 1  ���&
�& 
colr� n  ����� 4  ���%�
�% 
cobj� m  ���$�$ � o  ���#�# 0 swatchesref swatchesRef�'  �+  z o      �"�" 0 pathref4 pathRef4x ��� r  .��� J  &�� ��� J  �� ��� m  �!�!2� �� � m  
�� @gfffff�   � ��� J  �� ��� m  �� @u������� ��� m  �� @x�z�G��  � ��� J  �� ��� m  �� @pk33333� ��� m  �� @x�z�G��  � ��� J  $�� ��� m  ��2� ��� m  "�� @gfffff�  �  � n      ��� 1  )-�
� 
aiEP� o  &)�� 0 pathref4 pathRef4� ��� l //����  �  �  � ��� r  /X��� I /T���
� .corecrel****      � null�  � ���
� 
kocl� n 18��� m  48�
� 
caPA� o  14�� 0 groupref groupRef� ���
� 
prdt� K  9P�� ���
� 
aiFP� m  <=�
� boovtrue� ���
� 
aiFC� n  @N��� 1  JN�

�
 
colr� n  @J��� 4  CJ�	�
�	 
cobj� m  FI�� � o  @C�� 0 swatchesref swatchesRef�  �  � o      �� 0 pathref5 pathRef5� ��� r  Y���� J  Y��� ��� J  Ya�� ��� m  Y\�� @pk33333� ��� m  \_�� @~z�G��  � ��� J  ai�� ��� m  ad�� @u������� ��� m  dg�� @~z�G��  � ��� J  iq�� ��� m  il�� @u������� ��� m  lo�� @x�z�G��  � ��� J  qy�� ��� m  qt�� @pk33333� ��� m  tw�� @x�z�G��  � �� � J  y��� ��� m  y|�� @pk33333� ���� m  |�� @~z�G���  �   � n      ��� 1  ����
�� 
aiEP� o  ������ 0 pathref5 pathRef5�   * m     ��                                                                                  ART5   alis    �  Macintosh HD               �:#�H+   n�Adobe Illustrator.app                                           O�t�XH        ����  	                Adobe Illustrator CS5     �9�S      ���     n�     EMacintosh HD:Applications:Adobe Illustrator CS5:Adobe Illustrator.app   ,  A d o b e   I l l u s t r a t o r . a p p    M a c i n t o s h   H D  8Applications/Adobe Illustrator CS5/Adobe Illustrator.app  / ��  ��  ��  ��       ������  � ��
�� .aevtoappnull  �   � ****� �����������
�� .aevtoappnull  �   � ****� k    ���  '����  ��  ��  �  � 8������������������������� K������������������������������������������������������ � � � � �������!/��Y�����
�� .miscactvnull��� ��� null
�� 
kocl
�� 
docu
�� 
prdt
�� 
caCS
�� eCLSeCyM�� 
�� .corecrel****      � null�� 0 docref docRef
�� 
aiAD
�� 
cSGr
�� 
pnam��  0 swatchgroupref swatchGroupRef��  0 genswatchgroup genSwatchGroup�� 0 i  �� 
�� .AiClkGAscaSW  @    cSGr�� 0 swatchesref swatchesRef
�� 
cobj
�� .corecnte****       ****�� 0 swatchcount swatchCount
�� 
from
�� 
to  
�� .sysorandnmbr    ��� nmbr�� 0 swatchindex swatchIndex�� 0 currentswatch currentSwatch
�� 
colr
�� 
pcls
�� 
tPTi
�� 
tGDi
�� 
bool
�� 
kSWt
�� .AiClkAShnull���    cSGr
�� 
caGP�� 0 groupref groupRef
�� 
caPA
�� 
aiFP
�� 
aiFC�� 0 pathref1 pathRef1
�� 
aiEP�� 0 pathref2 pathRef2��2�� 0 pathref3 pathRef3�� 0 pathref4 pathRef4�� 0 pathref5 pathRef5�����*j O*�����l� E�O*�*�,�,���l� E�O��k/E�OjE` O �h_ a  �j E` O_ a -j E` O*a ka _ � E` O_ a _ /E` O_ a ,a ,a 	 _ a ,a ,a a  & �a !_ l "O_ kE` Y h[OY�wO�j E` O*��a #,l E` $O*�_ $a %,�a &ea '_ a k/a ,�� E` (Oa )a *lva +a ,lva +a -lva )a *lv�v_ (a .,FO*�_ $a %,�a &ea '_ a l/a ,�� E` /Oa 0a 1lva +a -lva 2a -lva 0a 1lv�v_ /a .,FO*�_ $a %,�a &ea '_ a m/a ,�� E` 3Oa 4a *lva 2a -lva 2a ,lva 4a *lv�v_ 3a .,FO*�_ $a %,�a &ea '_ a �/a ,�� E` 5Oa 0a 6lva 2a ,lva +a ,lva 0a 6lv�v_ 5a .,FO*�_ $a %,�a &ea '_ a a /a ,�� E` 7Oa +a -lva 2a -lva 2a ,lva +a ,lva +a -lva v_ 7a .,FUascr  ��ޭ